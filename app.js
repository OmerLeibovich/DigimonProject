const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

digimons = [];

app.get('/', (req, res) => {
      res.render('index',{digimons});
});

app.get('/getUpdatedList', (req, res) => {
  res.render('index', { digimons });
});

app.post('/digimon' ,(req, res) => {
    const photo = req.body.Photo;
    const name = req.body.Name;
    const rank = req.body.Rank;
    const level = req.body.Level;
    const attribute = req.body.Attribute;
    const hp = req.body.Hp;
    const attack = req.body.Attack;
    const defence = req.body.Defence;
    const newDigimon = {
      Photo: photo,
      Name: name,
      Rank: rank,
      Level: level,
      Attribute: attribute,
      Hp: hp,
      Attack: attack,
      Defence: defence,
    }

    digimons.push(newDigimon);
    res.sendStatus(200);
})


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});



