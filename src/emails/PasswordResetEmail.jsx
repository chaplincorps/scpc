import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
} from '@react-email/components';
import * as React from 'react';

export const PasswordResetEmail = ({
  verificationToken,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>SCPC - Password Reset Request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src='https://i.postimg.cc/4yJGtXgk/Blue-Logo.png'
            width="70"
            height="auto"
            alt="SCPC Logo"
            style={logo}
          />
          <Heading style={h1}>Password Reset</Heading>
          
          <Section style={section}>
            <Text style={text}>
               You have requested to reset your password with SCPC. Please use the following verification token:
            </Text>

                  <Section style={tokenSection}>
                     <Text style={tokenLabel}>Your Verification Token</Text>
                     <Text style={tokenValue}>{verificationToken}</Text>
                     <Text style={expirationText}>
                        This token will expire in 5 minutes
                     </Text>
                  </Section>
          </Section>

          <Section style={footer}>
            <Text style={disclaimerText}>
               If you did not request this password reset, please ignore this email.            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} SCPC. All rights reserved.
            </Text>
            <Text style={contactText}>
              Support Email: <Link href="mailto:support@chaplincorps.org.ng" style={link}>support@chaplincorps.org.ng</Link>
            </Text>
            <Text style={contactText}>
              Phone: +234 567 8990 566
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logo = {
  margin: '0 auto',
  marginBottom: '15px',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#006699',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  padding: '17px 0 0',
  textAlign: 'center',
};

const text = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
};

const tokenSection = {
  backgroundColor: '#006699',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
  textAlign: 'center',
};

const tokenLabel = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0 0 8px 0',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const tokenValue = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '16px 0',
  letterSpacing: '2px',
};

const expirationText = {
  color: '#ffffff',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#dc3545',
  borderRadius: '4px',
  margin: '20px 0',
};

const footer = {
  borderTop: '1px solid #e6ebf1',
  marginTop: '32px',
  padding: '24px 48px 0',
};

const disclaimerText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px 0',
};

const footerText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px 0',
};

const contactText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px 0',
};

const link = {
  color: '#006699',
  textDecoration: 'underline',
};


export default PasswordResetEmail; 