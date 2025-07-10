const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const Checkuser =  async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const remamber = req.body.remamber;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username }
    });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.regenerate(function (err) {
      if (err) return next(err);

      req.session.user = { id: user.id, username: user.username , password: password,remamber: remamber };
      
   if (remamber === true){
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(200).json({ isLoggedIn: true });
      });
   }
  else{
    res.status(200).json({ isLoggedIn: false });
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
