'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;
    let particles: Person[] = [];
    let phase: 'init' | 'gathering' | 'word' | 'bnf' | 'disperse' | 'logo' = 'init';
    let animationId = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let wordPoints: { x: number; y: number }[] = [];
    let bnfPoints: { x: number; y: number }[] = [];

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(DPR, DPR);
    }

    function getTextPoints(text: string, fontSize: number, fontWeight: number) {
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const octx = off.getContext('2d')!;
      octx.fillStyle = '#000';
      octx.font = `${fontWeight} ${fontSize}px Inter, sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(text, W / 2, H / 2);
      const data = octx.getImageData(0, 0, W, H).data;
      const points: { x: number; y: number }[] = [];
      const step = Math.max(10, Math.floor(W / 110));
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4;
          if (data[idx + 3] > 128) points.push({ x, y });
        }
      }
      return points;
    }

    class Person {
      x: number = 0;
      y: number = 0;
      targetX: number = 0;
      targetY: number = 0;
      scale: number;
      opacity: number = 0;
      color: string = '#0a0a0a';
      phaseOffset: number;
      bob: number = 0;

      constructor() {
        this.reset();
        this.targetX = this.x;
        this.targetY = this.y;
        this.scale = 0.85 + Math.random() * 0.3;
        this.phaseOffset = Math.random() * Math.PI * 2;
      }

      reset() {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { this.x = Math.random() * W; this.y = -40; }
        else if (side === 1) { this.x = W + 40; this.y = Math.random() * H; }
        else if (side === 2) { this.x = Math.random() * W; this.y = H + 40; }
        else { this.x = -40; this.y = Math.random() * H; }
      }

      setTarget(x: number, y: number, color?: string) {
        this.targetX = x;
        this.targetY = y;
        if (color) this.color = color;
      }

      update(easeFactor: number, time: number) {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.x += dx * easeFactor;
        this.y += dy * easeFactor;
        if (this.opacity < 1) this.opacity = Math.min(1, this.opacity + 0.025);
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.bob = dist > 5 ? Math.sin(time * 0.012 + this.phaseOffset) * 0.6 : 0;
      }

      draw() {
        const c = ctx!;
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.translate(this.x, this.y + this.bob);
        c.scale(this.scale, this.scale);
        c.beginPath();
        c.arc(0, -3.5, 1.7, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.moveTo(-1.3, -1);
        c.lineTo(1.3, -1);
        c.quadraticCurveTo(2.2, -1, 2.2, 0);
        c.lineTo(2.2, 3.5);
        c.quadraticCurveTo(2.2, 4.5, 1.3, 4.5);
        c.lineTo(-1.3, 4.5);
        c.quadraticCurveTo(-2.2, 4.5, -2.2, 3.5);
        c.lineTo(-2.2, 0);
        c.quadraticCurveTo(-2.2, -1, -1.3, -1);
        c.fill();
        c.restore();
      }
    }

    function init() {
      resize();
      particles = [];
      const fontSize = Math.min(W * 0.13, 150);
      wordPoints = getTextPoints('MARKETING', fontSize, 800);
      bnfPoints = getTextPoints('BNF', Math.min(W * 0.22, 240), 900);
      const targetCount = Math.max(wordPoints.length, bnfPoints.length, 200);
      for (let i = 0; i < targetCount; i++) particles.push(new Person());
    }

    function startAnimation() {
      timeouts.forEach((t) => clearTimeout(t));
      timeouts.length = 0;
      phase = 'init';
      setShowLogo(false);
      setShowOverlay(false);

      particles.forEach((p) => { p.reset(); p.opacity = 0; p.color = '#404040'; });

      timeouts.push(setTimeout(() => {
        phase = 'gathering';
        particles.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 60 + Math.random() * Math.min(W, H) * 0.25;
          p.setTarget(W / 2 + Math.cos(angle) * radius, H / 2 + Math.sin(angle) * radius * 0.7, '#404040');
        });
      }, 200));

      timeouts.push(setTimeout(() => {
        phase = 'word';
        particles.forEach((p, i) => {
          if (i < wordPoints.length) p.setTarget(wordPoints[i].x, wordPoints[i].y, '#0a0a0a');
          else p.setTarget(W / 2 + (Math.random() - 0.5) * W * 1.4, H / 2 + (Math.random() - 0.5) * H * 1.2, 'rgba(64,64,64,0.2)');
        });
      }, 2500));

      timeouts.push(setTimeout(() => {
        phase = 'bnf';
        particles.forEach((p, i) => {
          if (i < bnfPoints.length) p.setTarget(bnfPoints[i].x, bnfPoints[i].y, '#0a0a0a');
          else p.setTarget(W / 2 + (Math.random() - 0.5) * W * 1.6, H / 2 + (Math.random() - 0.5) * H * 1.4, 'rgba(64,64,64,0.15)');
        });
      }, 5000));

      timeouts.push(setTimeout(() => {
        phase = 'disperse';
        particles.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.max(W, H);
          p.setTarget(W / 2 + Math.cos(angle) * dist, H / 2 + Math.sin(angle) * dist, 'rgba(64,64,64,0)');
        });
      }, 7000));

      timeouts.push(setTimeout(() => {
        phase = 'logo';
        setShowLogo(true);
      }, 7600));

      timeouts.push(setTimeout(() => {
        setShowOverlay(true);
      }, 8600));
    }

    function tick(time: number) {
      ctx!.clearRect(0, 0, W, H);
      let ease = 0.05;
      if (phase === 'gathering') ease = 0.045;
      else if (phase === 'word') ease = 0.075;
      else if (phase === 'bnf') ease = 0.075;
      else if (phase === 'disperse') ease = 0.06;
      else if (phase === 'logo') ease = 0.06;
      particles.forEach((p) => { p.update(ease, time); p.draw(); });
      ctx!.globalAlpha = 1;
      animationId = requestAnimationFrame(tick);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        init();
        tick(performance.now());
      }, 200);
    };
    window.addEventListener('resize', onResize);

    init();
    startAnimation();
    tick(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [replayKey]);

  return (
    <section style={{ height: '100vh', minHeight: 680, position: 'relative', overflow: 'hidden', background: 'var(--white)' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

      <img
        src="/bnf-logo-dark.png"
        alt="BnF"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: showLogo ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(.8)',
          width: 'min(280px, 28vw)',
          opacity: showLogo ? 1 : 0,
          transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(.25,.46,.45,.94)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '120px 48px 48px', pointerEvents: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'var(--gray-500)',
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: showOverlay ? 1 : 0, transition: 'opacity 1.4s ease',
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--ink)', borderRadius: '50%', display: 'block' }} />
          <span>{t('meta.established')}</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--gray-500)', display: 'flex', justifyContent: 'space-between', alignItems: 'end',
          opacity: showOverlay ? 1 : 0, transition: 'opacity 1.4s ease', flexWrap: 'wrap', gap: 24,
        }}>
          <span>{t('hero.tagline')}</span>
          <span style={{ color: 'var(--gray-700)' }}>{t('hero.scroll')}</span>
        </div>
      </div>

      <button
        onClick={() => setReplayKey((k) => k + 1)}
        style={{
          position: 'absolute', right: 48, bottom: 48, zIndex: 10,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase',
          color: 'var(--gray-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', border: '1px solid var(--gray-200)', background: '#fff',
          opacity: showOverlay ? 0.7 : 0, transition: 'opacity 1s ease',
        }}
      >
        {t('hero.replay')}
      </button>
    </section>
  );
}
