const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const mailsender = require('../mailsender');


const adduser = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const token = jwt.sign({
            data: 'Token Data'  
        }, 'DigiSecretKey', { expiresIn: '180m' }  
    );    

  try {
    const newUser = await prisma.user.create({
        data:{
            email: email,
            password: password,
            username: username,
            token : token
        }
      });

      mailsender.sendmail(token,email,username,'register');
          res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
     if (error.code === 'P2002') {
            const field = error.meta?.target?.[0];
            if (field === 'username') {
                return res.status(400).send('Username is already taken');
            }
            if (field === 'email') {
                return res.status(400).send('Email is already exist');
            }
        }
    res.status(500).send('An error occurred while creating the user');
  }
};

const confirm_email = async(req, res) =>{
    const {token} = req.params;
       console.log(token);
  try {
    const user = await prisma.user.findFirst({
       where :{
        token: token,
       }
      });

    const confirm = jwt.verify(token, 'DigiSecretKey');
    if (confirm){
        await prisma.user.update({
            where:{
                id: user.id,
            },
            data :{
                isActivate: true,
                token: "null",
            },
           })
           req.session.Havetoken = false;
            res.render('userconfirm');

        }
    else{
        res.status(502).send('An error occurred while verification the user');
    }

  } catch (error) {
    res.status(500).send('An error occurred while verification the user');
  }

}

const resetpassword = async(req,res) =>{
    const email = req.body.email;


    const token = jwt.sign({
            data: 'Token Data'  
        }, 'DigiSecretKey', { expiresIn: '180m' }  
    );   
    try{
        const user = await prisma.user.findFirst({
            where:{
                email: email,
            },
        })
    if(user.isActivate){
         const newtoken = await prisma.user.update({
            where:{
                email: email,
            },
            data: {
                token:token
                },
        })
        mailsender.sendmail(token,email,user.username,'resetpassword');
        res.status(200).json(newtoken);
    }
    else{
        res.status(500).send('Need to verification email first');
          }
    }
    catch(error){
        res.status(500).send("Email doesn't exist");
    }
}


const confirm_reset_password = async(req,res) =>{
    const password = req.body.password;
    const token = req.body.token;
  try {
    const confirm = jwt.verify(token, 'DigiSecretKey');
    if (confirm){

    const user = await prisma.user.findFirst({
       where :{
        token: token,
       }
      });

    const updatepassword = await prisma.user.update({
       where :{
        id: user.id,
       },
       data:{
        password: password,
        token: "null",
       }
      });


      res.status(200).json(updatepassword);
    }

}
     catch(error){
        res.status(500).send('An error occurred while reset your password');
    }

}

module.exports ={
    adduser,
    confirm_email,
    resetpassword,
    confirm_reset_password,
}
