const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const Checkuser =  async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const remamber = req.query.remamber;

  try {
   const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });


    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.regenerate(function (err) {
      if (err) return next(err);

      req.session.user = { id: user.id, username: user.username , password: password,remamber: remamber,money:user.money};
      
   if (user.isActivate) {
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(200).json({ isLoggedIn: true,id: user.id,user: req.session.user,money:user.money });
      });
   }
  else{
    res.status(403).send('You need verification email');
  }
});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports ={
    Checkuser,
}
