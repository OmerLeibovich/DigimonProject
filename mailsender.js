const nodemailer = require('nodemailer');
require('dotenv').config();

function sendmail(token,email, username ,type) {
    var message;
    var title;
    if (type === 'register'){
        message = `Hi DigiDestined ${username},

            Your adventure starts now!  
            To begin, simply click the link below:

            http://localhost:${process.env.PORT}/verify/${token}

            Good luck!`;
        title = 'Email Verification';
    }
    else{
        message = `Hi DigiDestined ${username},

            We received a request to reset your password. You can reset it by clicking the link below:

            Reset your password:
             http://localhost:${process.env.PORT}/reset/${token}

            If you didn’t request a password reset, you can ignore this email.

            Thanks,  
            The digimon-tra Team
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
    from: 'DigiTra@gmail.com',

    to: email,

    // Subject of Email
    subject: title,
    
    // This would be the text of email body
    text: message,

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