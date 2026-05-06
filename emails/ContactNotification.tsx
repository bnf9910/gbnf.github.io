import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactNotificationProps {
  company: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  services?: string[];
  budget?: string;
  message: string;
  locale: string;
}

export default function ContactNotification(props: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New inquiry from {props.name} ({props.company})
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Project Inquiry</Heading>
          <Text style={subtitle}>
            B&F Website · gbnf.kr · Locale: {props.locale.toUpperCase()}
          </Text>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>
              Contact Information
            </Heading>
            <Text style={fieldLabel}>Company</Text>
            <Text style={fieldValue}>{props.company}</Text>

            <Text style={fieldLabel}>Name</Text>
            <Text style={fieldValue}>{props.name}</Text>

            <Text style={fieldLabel}>Position</Text>
            <Text style={fieldValue}>{props.position || '-'}</Text>

            <Text style={fieldLabel}>Phone</Text>
            <Text style={fieldValue}>{props.phone}</Text>

            <Text style={fieldLabel}>Email</Text>
            <Text style={fieldValue}>{props.email}</Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading as="h2" style={h2}>
              Project Details
            </Heading>
            {props.services && props.services.length > 0 && (
              <>
                <Text style={fieldLabel}>Interested Services</Text>
                <Text style={fieldValue}>{props.services.join(', ')}</Text>
              </>
            )}
            {props.budget && (
              <>
                <Text style={fieldLabel}>Budget</Text>
                <Text style={fieldValue}>{props.budget}</Text>
              </>
            )}
            <Text style={fieldLabel}>Message</Text>
            <Text style={messageBox}>{props.message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This message was sent from the B&F website contact form.
            <br />
            Reply directly to this email to contact {props.name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color: '#f5f1e8',
};

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '600px',
};

const h1 = {
  color: '#f5f1e8',
  fontSize: '32px',
  fontWeight: '300',
  margin: '0 0 8px',
  letterSpacing: '-0.02em',
};

const subtitle = {
  color: '#a8a39a',
  fontSize: '13px',
  margin: '0',
  letterSpacing: '0.05em',
};

const h2 = {
  color: '#c9a66b',
  fontSize: '14px',
  fontWeight: '500',
  margin: '24px 0 16px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const fieldLabel = {
  color: '#5a564f',
  fontSize: '11px',
  fontWeight: '500',
  margin: '12px 0 4px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const fieldValue = {
  color: '#f5f1e8',
  fontSize: '15px',
  margin: '0 0 8px',
};

const messageBox = {
  color: '#f5f1e8',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  padding: '16px',
  backgroundColor: '#1a1a1a',
  borderLeft: '3px solid #c9a66b',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#1a1a1a',
  margin: '24px 0',
};

const footer = {
  color: '#5a564f',
  fontSize: '12px',
  lineHeight: '1.5',
  marginTop: '32px',
  textAlign: 'center' as const,
};
