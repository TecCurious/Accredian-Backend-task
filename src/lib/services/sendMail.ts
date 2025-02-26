import nodemailer from 'nodemailer';
import { ReferralInfo } from '../types';
import dotenv from "dotenv";
import ApiError from '../../utils/apiError';



dotenv.config();

async function sendReferralEmail(referralInfo: ReferralInfo): Promise<any> {
    try {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST as string, 
    port: Number(process.env.NODEMAILER_PORT),
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
  });


  const programDetailsText = `Details about the ${referralInfo.programName} program`;

  const mailOptions = {
    from: 'tecnocrates006@gmail.com', 
    to: referralInfo.refereeEmail,
    cc: referralInfo.referrerEmail, 
    subject: `${referralInfo.referrerName} has referred you to ${referralInfo.programName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>You've been referred!</h2>
        <p>Hello ${referralInfo.refereeName},</p>
        <p><strong>${referralInfo.referrerName}</strong> (${referralInfo.referrerEmail}) has referred you to the <strong>${referralInfo.programName}</strong> program.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Program Information</h3>
          <p>${programDetailsText}</p>
        </div>
        
        <p>If you have any questions, please don't hesitate to reach out.</p>
        <p>Best regards,<br>The ${referralInfo.programName} Team</p>
      </div>
    `,
    text: `
      You've been referred!
      
      Hello ${referralInfo.refereeName},
      
      ${referralInfo.referrerName} (${referralInfo.referrerEmail}) has referred you to the ${referralInfo.programName} program.
      
      Program Information:
      ${programDetailsText}
      
      If you have any questions, please don't hesitate to reach out.
      
      Best regards,
      The ${referralInfo.programName} Team
    `,
  };

 
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully');
    console.log('Message ID:', info.messageId);
    return info;
  } catch (error:any) {
    console.error('Error sending referral email:', error);
    throw new ApiError(500, error.message);
  }
}



export default sendReferralEmail;