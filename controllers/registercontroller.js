const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const adduser = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

  try {
    const newUser = await prisma.user.create({
        data:{
            email: email,
            password: password,
            username: username
        }
      });
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

module.exports ={
    adduser,
}
