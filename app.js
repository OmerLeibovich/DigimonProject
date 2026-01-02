const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DigiRoutes = require('./routes/digimonroute');
const loginRoute = require('./routes/loginroute');
const itemRoute = require('./routes/inventoryroute')
const statisticRoute = require('./routes/statisticroute');
const shopRoute = require('./routes/shoproute');
const registerRoute = require('./routes/registerroute');

const express = require('express');
const session = require('express-session');

require('dotenv').config();

const app = express();

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
app.use('/',registerRoute);
app.use('/',itemRoute);
app.use('/',statisticRoute);
app.use('/',shopRoute);
app.get('/', (req, res) => {
  if(req.session && req.session.Havetoken && req.session.token){
      res.render('index',{isLoggedIn: false, Havetoken: true ,token : req.session.token});
  }
  else{
  if (req.session && req.session.user) {
    res.render('index', { isLoggedIn: true, user: req.session.user ,Havetoken: false });
  }
  else {
      res.render('index', { isLoggedIn: false, user: req.session.user || null, Havetoken: false });
    }
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

app.get('/reset/:token',(req,res) =>{
    req.session.Havetoken = true;
    req.session.token = req.params.token;
    res.redirect('/');
})

module.exports = { app, prisma };



