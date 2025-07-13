const nodemailer = require('nodemailer');
require('dotenv').config();

function sendmail(token,email,username) {


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
    subject: 'Email Verification',
    
    // This would be the text of email body
    text: `Hi DigiDestined ${username},

           Your adventure starts now!  
           To begin, simply click the link below:

           http://localhost:${process.env.PORT}/verify/${token}

           Good luck!`

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