const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const NodeCache = require( "node-cache" );
const cache = new NodeCache(); 
const DigiRoutes = require('./routes/digimonroute');
const loginRoute = require('./routes/loginroute');
const express = require('express');
const session = require('express-session');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// save user session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    secure: false
  },
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000, 
      dbRecordIdIsSessionId: true,
    }
  )
}));

app.use('/',DigiRoutes);
app.use('/',loginRoute);
app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    console.log(req.session);
    res.render('index', { isLoggedIn: true });
  } else {
    res.render('index', { isLoggedIn: false });
  }
});
app.get('/logout', async (req, res) =>{
  const session = req.sessionID;
  if(session){
  await prisma.Session.delete({
      where: { id: session }
    });
    res.redirect('/');
  }
})

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});



