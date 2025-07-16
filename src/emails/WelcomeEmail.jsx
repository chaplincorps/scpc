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

export const WelcomeEmail = ({
  applicationId,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Welcome to SCPC!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src='https://i.postimg.cc/4yJGtXgk/Blue-Logo.png'
            width="70"
            height="auto"
            alt="SCPC Logo"
            style={logo}
          />
          <Heading style={h1}>Welcome to SCPC</Heading>
          
          <Section style={section}>
            <Text style={text}>
              Welcome to SCPC, Your account is now active and ready for application.
            </Text>
            
            <Section style={applicationIdSection}>
              <Text style={applicationIdLabel}>Your Application ID</Text>
              <Text style={applicationIdValue}>{applicationId}</Text>
              <Text style={applicationIdNote}>
                Please save this ID - you'll need it for future logins
              </Text>
            </Section>

            <Text style={text}>
              You can now log in to your account and start your application.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={disclaimerText}>
               If you did not request this registration, please ignore this email.            </Text>
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
  marginBottom: '24px',
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

const applicationIdSection = {
  backgroundColor: '#006699',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
  textAlign: 'center',
};

const applicationIdLabel = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0 0 8px 0',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const applicationIdValue = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '16px 0',
  letterSpacing: '2px',
};

const applicationIdNote = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '8px 0 0 0',
  opacity: 0.9,
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

export default WelcomeEmail; 