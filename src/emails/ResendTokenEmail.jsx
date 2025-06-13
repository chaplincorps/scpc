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

export const ResendTokenEmail = ({
  verificationToken,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>New Verification Token - Expires in 3 Minutes</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src='https://i.postimg.cc/4yJGtXgk/Blue-Logo.png'
            width="70"
            height="auto"
            alt="SCPC Logo"
            style={logo}
          />
          <Heading style={h1}>New Verification Token</Heading>
          
          <Section style={section}>
            <Text style={text}>
              You have requested a new verification token. Please use the token below to verify your email address.
            </Text>
            
            <Section style={tokenSection}>
              <Text style={tokenLabel}>Your Verification Token</Text>
              <Text style={tokenValue}>{verificationToken}</Text>
              <Text style={expirationText}>
                This token will expire in 3 minutes
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={disclaimerText}>
             If you did not request this verification token, please ignore this email.
            </Text>
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
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const logo = {
  margin: '0 auto',
  marginBottom: '15px',
};

const h1 = {
  color: '#006699',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center',
};

const section = {
  padding: '0 48px',
};

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
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

export default ResendTokenEmail; 