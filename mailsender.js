const nodemailer = require('nodemailer');
require('dotenv').config();

function sendmail(token,email, username ,type) {
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASSWORD exists?", !!process.env.PASSWORD);
    var message;
    var title;
    if (type === 'register'){
        message = `<h2>Hi DigiDestined ${username}</h2>

            <span>Your adventure starts now!  
            To begin, simply click the link below:</span>
            <br><br>
            <a href="http://localhost:${process.env.PORT}/verify/${token}">Click Here</a>
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
             <a href="http://localhost:${process.env.PORT}/reset/${token}">Click Here</a>
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



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


const mailConfigurations = {

    // It should be a string of sender/server email
    from: process.env.EMAIL,

    to: email,

    // Subject of Email
    subject: title,
    
    // This would be the text of email body
    html: message,

};

transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});
}

module.exports = {
    sendmail,
}