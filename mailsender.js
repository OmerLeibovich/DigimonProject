require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendmail(token,email, username ,type) {
    console.log("SendGrid Key loaded?", !!process.env.SENDGRID_API_KEY);
    var message;
    var title;
    if (type === 'register'){
        message = `<h2>Hi DigiDestined ${username}</h2>

            <span>Your adventure starts now!  
            To begin, simply click the link below:</span>
            <br><br>
            <a href="http://digimontra.up.railway.app/verify/${token}">Click Here</a>
            <br><br>
           <span>Good luck!</span>
           <br>
           <img src="https://i.postimg.cc/mkrktwyY/logo.png">
           `;
        title = 'Email Verification';
    }
    else{
        message = `<h2>Hi DigiDestined ${username}</h2>

            <span>We received a request to reset your password. You can reset it by clicking the link below:</span>
            <br>
            <span>Reset your password:</span>
            <br>
             <a href="https://digimontra.up.railway.app/reset/${token}">Click Here</a>
            <br><br>
            <span>If you didn’t request a password reset, you can ignore this email.</span>
            <br><br>
            <span>Thanks,</span>  
            <br>
            <span>The digi-tra Team<span>
            <br>
            <img src="https://i.postimg.cc/mkrktwyY/logo.png">
            `;
            title = 'reset password';
    }


const msg = {
  to: email,
  from: "omerlibo7@gmail.com",
  subject: title,
  html: message,
};
sgMail.send(msg);

}

module.exports = {
    sendmail,
}
