const nodemailer = require('nodemailer');
require('dotenv').config();

function sendAlert(issues) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('📧 Email not configured, skipping alert.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_TO,
    subject: '🛑 Data Alert: Issues Found in Product Feed',
    text: issues.join('\n'),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email error:', error);
    } else {
      console.log('📨 Alert sent:', info.response);
    }
  });
}

module.exports = sendAlert;
