const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const express = require('express');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
    try{
      const digimons = await prisma.digimon.findMany({
                    orderBy: { level: 'asc' },
                })
      res.render('index',{digimons});
    }
    catch (error) {
    console.error('Error reading digimon list:', error);
    res.status(500).send('Something went wrong');
  }
});

app.post('/addDigimon' ,async (req, res) => {
    try {
    const photo = req.body.Photo;
    const name = req.body.Name;
    const rank = req.body.Rank;
    const level = req.body.Level;
    const attribute = req.body.Attribute;
    const hp = req.body.Hp;
    const attack = req.body.Attack;
    const defense = req.body.Defense;
    const experience = 0;
    const levelInt = parseInt(level);
    const levelUpExp = levelInt * 40;

    const newDigimon = await prisma.digimon.create({
            data: {
              photo:photo,
              name:name,
              rank:rank,
              level:level,
              experience:experience,
              levelUPExp:levelUpExp,
              type:attribute,
              hp:hp,
              attack:attack,
              defense:defense,
            },
          })
    
    
    res.status(200).json(newDigimon);
        }
    catch (error) {
    console.error('Error creating digimon:', error);
    res.status(500).send('Something went wrong');
  }
})
app.delete('/deleteDigimon', async (req, res) =>{
  try{
    const DigimonId = parseInt(req.body.id);

    const deleteDigimon = await prisma.digimon.delete({
      where:{ id: DigimonId}
    })
    res.status(200).json(deleteDigimon);
  }
  catch(error) {
    console.error('Error deleteing digimon:', error);
    res.status(500).send('Something went wrong');
  }
})

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});



