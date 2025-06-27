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
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use('/',DigiRoutes);
app.use('/',loginRoute);
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});



