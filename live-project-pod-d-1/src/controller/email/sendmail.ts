import nodemailer from 'nodemailer';
const sendEmail = async (options: any) => {
  
  const transporter = nodemailer.createTransport({
    
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // define email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // actually send the mail
  await transporter.sendMail(mailOptions);
};
export default sendEmail;