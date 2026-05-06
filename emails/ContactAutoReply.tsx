import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface ContactAutoReplyProps {
  name: string;
  locale: string;
}

const TRANSLATIONS: Record<
  string,
  {
    preview: string;
    greeting: (name: string) => string;
    body: string;
    closing: string;
    teamName: string;
    contactInfo: string;
  }
> = {
  ko: {
    preview: '문의가 정상적으로 접수되었습니다',
    greeting: (n) => `${n}님, 안녕하세요.`,
    body: 'B&F에 문의주셔서 감사합니다.\n담당자가 24시간 이내에 검토 후 회신드리겠습니다.\n급한 경우 아래 연락처로 직접 연락 부탁드립니다.',
    closing: '곧 다시 인사드리겠습니다.',
    teamName: 'B&F 팀',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  en: {
    preview: 'We received your inquiry',
    greeting: (n) => `Dear ${n},`,
    body: 'Thank you for reaching out to B&F.\nOur team will review your inquiry and respond within 24 hours.\nFor urgent matters, please contact us directly using the information below.',
    closing: 'We look forward to connecting with you.',
    teamName: 'The B&F Team',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  ja: {
    preview: 'お問い合わせを受け付けました',
    greeting: (n) => `${n}様`,
    body: 'B&Fにお問い合わせいただきありがとうございます。\n担当者が24時間以内に内容を確認し、ご返信いたします。\nお急ぎの場合は、下記までご連絡ください。',
    closing: 'お返事をお待ちいただけますと幸いです。',
    teamName: 'B&Fチーム',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  'zh-CN': {
    preview: '我们已收到您的咨询',
    greeting: (n) => `${n}先生/女士,您好。`,
    body: '感谢您联系B&F。\n我们的团队将在24小时内审核您的咨询并回复。\n如有紧急事项,请通过以下联系方式直接联系我们。',
    closing: '期待与您的进一步交流。',
    teamName: 'B&F 团队',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  'zh-TW': {
    preview: '我們已收到您的諮詢',
    greeting: (n) => `${n}先生/女士,您好。`,
    body: '感謝您聯繫B&F。\n我們的團隊將在24小時內審核您的諮詢並回覆。\n如有緊急事項,請透過以下聯絡方式直接聯繫我們。',
    closing: '期待與您的進一步交流。',
    teamName: 'B&F 團隊',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  mn: {
    preview: 'Таны хүсэлтийг хүлээн авлаа',
    greeting: (n) => `Эрхэм ${n} танаа,`,
    body: 'B&F-тэй холбогдсонд баярлалаа.\nМанай баг таны хүсэлтийг 24 цагийн дотор хянаж хариу өгөх болно.\nЯаралтай асуудлын хувьд доорх мэдээллээр шууд холбогдоно уу.',
    closing: 'Удахгүй харилцана.',
    teamName: 'B&F баг',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  fil: {
    preview: 'Natanggap namin ang inyong inquiry',
    greeting: (n) => `Kamusta ${n},`,
    body: 'Salamat sa pagkontak sa B&F.\nSusuriin ng aming team ang inyong inquiry at sasagutin sa loob ng 24 na oras.\nPara sa mga madaliang bagay, mangyaring direktang kontakin kami sa impormasyon sa ibaba.',
    closing: 'Inaasahan namin ang aming pakikipag-ugnayan sa inyo.',
    teamName: 'Ang B&F Team',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  th: {
    preview: 'เราได้รับคำถามของคุณแล้ว',
    greeting: (n) => `เรียน คุณ${n}`,
    body: 'ขอบคุณที่ติดต่อ B&F\nทีมงานของเราจะตรวจสอบคำถามของคุณและตอบกลับภายใน 24 ชั่วโมง\nสำหรับเรื่องเร่งด่วน กรุณาติดต่อเราโดยตรงตามข้อมูลด้านล่าง',
    closing: 'เราหวังว่าจะได้ติดต่อกับคุณเร็วๆ นี้',
    teamName: 'ทีม B&F',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
  vi: {
    preview: 'Chúng tôi đã nhận được yêu cầu của bạn',
    greeting: (n) => `Kính gửi ${n},`,
    body: 'Cảm ơn bạn đã liên hệ với B&F.\nĐội ngũ của chúng tôi sẽ xem xét yêu cầu của bạn và phản hồi trong vòng 24 giờ.\nĐối với các vấn đề khẩn cấp, vui lòng liên hệ trực tiếp qua thông tin bên dưới.',
    closing: 'Chúng tôi mong được kết nối với bạn.',
    teamName: 'Đội ngũ B&F',
    contactInfo: '+82 2 588 9910 · info@gbnf.kr',
  },
};

export default function ContactAutoReply({ name, locale }: ContactAutoReplyProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={brand}>B&F</Heading>
          <Text style={subtitle}>
            Hyper-automated MarTech & Brand Solutions Group
          </Text>

          <Hr style={hr} />

          <Text style={greeting}>{t.greeting(name)}</Text>

          <Text style={body}>{t.body}</Text>

          <Text style={closing}>{t.closing}</Text>

          <Text style={signature}>— {t.teamName}</Text>

          <Hr style={hr} />

          <Text style={contactInfo}>{t.contactInfo}</Text>
          <Text style={address}>
            25, Nonhyeon-ro 160-gil, Gangnam-gu, Seoul, Republic of Korea
          </Text>
          <Text style={website}>
            <Link href="https://gbnf.kr" style={link}>
              gbnf.kr
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Pretendard Variable", sans-serif',
  color: '#f5f1e8',
};

const container = {
  margin: '0 auto',
  padding: '60px 32px',
  maxWidth: '560px',
};

const brand = {
  color: '#f5f1e8',
  fontFamily: 'Georgia, serif',
  fontSize: '48px',
  fontWeight: '300',
  margin: '0 0 8px',
  letterSpacing: '-0.02em',
};

const subtitle = {
  color: '#a8a39a',
  fontSize: '12px',
  margin: '0',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
};

const hr = {
  borderColor: '#1a1a1a',
  margin: '32px 0',
};

const greeting = {
  color: '#f5f1e8',
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 16px',
};

const body = {
  color: '#a8a39a',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 24px',
  whiteSpace: 'pre-wrap' as const,
};

const closing = {
  color: '#f5f1e8',
  fontSize: '15px',
  margin: '24px 0 8px',
};

const signature = {
  color: '#c9a66b',
  fontSize: '15px',
  fontStyle: 'italic',
  margin: '0',
};

const contactInfo = {
  color: '#a8a39a',
  fontSize: '13px',
  margin: '0 0 4px',
};

const address = {
  color: '#5a564f',
  fontSize: '12px',
  margin: '0 0 8px',
};

const website = {
  margin: '0',
};

const link = {
  color: '#c9a66b',
  fontSize: '13px',
  textDecoration: 'none',
};
