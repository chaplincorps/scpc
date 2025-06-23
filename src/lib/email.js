import { render } from '@react-email/render';
import { RegistrationEmail } from '@emails/RegistrationEmail';
import { VerificationSuccessEmail } from '@emails/VerificationSuccessEmail';
import { ResendTokenEmail } from '@emails/ResendTokenEmail';
import {VerificationEmail} from '@emails/VerificationEmail';
import { getMTATransporter } from '@lib/mailer';

export async function sendRegistrationEmail({ to, verificationToken }) {
  const emailHtml = await render(
    <RegistrationEmail
      verificationToken={verificationToken}
    />
  ).then(html => html);

  try {
    const transporter = getMTATransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'Welcome to SCPC - Verify Your Registration',
      html: emailHtml,
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendVerificationSuccessEmail({ to, applicationId }) {
  const emailHtml = await render(
    <VerificationSuccessEmail
      applicationId={applicationId}
    />
  ).then(html => html);

  try {
    const transporter = getMTATransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'Your SCPC Account is Now Verified!',
      html: emailHtml,
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log('Verification success email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending verification success email:', error);
    throw error;
  }
}

export async function sendResendTokenEmail({ to, verificationToken }) {
  const emailHtml = await render(
    <ResendTokenEmail
      verificationToken={verificationToken}
    />
  ).then(html => html);

  try {
    const transporter = getMTATransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'New Verification Token - Expires in 3 Minutes',
      html: emailHtml,
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log('Resend token email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending resend token email:', error);
    throw error;
  }
} 

export async function sendVerificationEmail({ to, token }) {
  const emailHtml = await render(
    <VerificationEmail
      verificationToken={token}
    />
  ).then(html => html);

  try {
    const transporter = getMTATransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'Email Verification Request',
      html: emailHtml,
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}