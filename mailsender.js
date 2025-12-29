require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendmail(token, email, username, type) {
  let message;
  let title;

  if (type === 'register') {
    title = 'Email Verification';
    message = `
      <h2>Hi DigiDestined ${username}</h2>
      <span>Your adventure starts now! To begin, click the link below:</span>
      <br><br>
      <a href="https://digimontra.xyz/verify/${token}">Click Here</a>
      <br><br>
      <span>Good luck!</span>
      <br>
      <img src="https://digimontra.xyz/assets/logo/digitraLogo.png">
    `;
  } else {
    title = 'Reset Password';
    message = `
      <h2>Hi DigiDestined ${username}</h2>
      <span>We received a request to reset your password.</span>
      <br><br>
      <a href="https://digimontra.xyz/reset/${token}">Click Here</a>
      <br><br>
      <span>If you didn’t request a password reset, you can ignore this email.</span>
      <br><br>
      <span>Thanks,</span><br>
      <span>The Digi-Tra Team</span>
      <br>
      <img src="https://digimontra.xyz/assets/logo/digitraLogo.png">
    `;
  }

  const { data, error } = await resend.emails.send({
    from: 'Digi-Tra <info@digimontra.xyz>',
    to: email,
    subject: title,
    html: message,
  });

  if (error) {
    console.error('Resend error:', error);
    return false;
  }

  console.log('Resend success:', data);
  return true;
}

module.exports = { sendmail };
