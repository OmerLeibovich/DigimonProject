const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const FormData = require('form-data');






const getAllDigis = async (req, res) => {
  try {
    if (!req.session?.user?.id) {
      return res.status(401).send('Unauthorized');
    }

    const digimons = await prisma.digimon.findMany({
      where: { userid: req.session.user.id },
      orderBy: { level: 'asc' }
    });

    const pages = req.query.pages * 10;

    const DigiPage = digimons.slice(pages-10,pages);

      res.render('DigimonSystem/digimonTable', { DigiPage}); 
  } catch (error) {
    console.error('Error fetching digimons (AJAX):', error);
    res.status(500).send('Something went wrong');
  }
  }


const getPages = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) return res.status(401).send("Unauthorized");

    const count = await prisma.digimon.count({
      where: { userid: userId }
    });

    res.render('DigimonSystem/digimonPages', { count });
  } catch (error) {
    console.error('Error fetching page count:', error);
    res.status(500).send('Something went wrong');
  }
};

const getUserdigis = async (req,res) =>{
  try{
      if (!req.session?.user?.id) {
      return res.status(401).send('Unauthorized');
    }
     const digimons = await prisma.digimon.findMany({
      where: { userid: req.session.user.id },
      orderBy: { level: 'asc' }
    });

    res.render('DigimonSystem/userdigimons', { digimons });
  }
  catch (error){
      console.error('Error fetching user digis:', error);
    res.status(500).send('Something went wrong');
  }
}

const clearbackground = async (req, res) => {
  try {
    const photo = req.body.imageUrl;
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", photo);

    const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVEBG,
      },
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    res.send({ cleanedImageUrl: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    console.error("Error clearing background:", error.response?.data || error.message);
    res.status(500).send("Something went wrong");
  }
};
const addDigi = async (req, res) => {
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
    const userid = req.session.user?.id;
      if (!userid) {
      return res.status(401).send('Unauthorized: no user session');
    }

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
              userid: userid,
            },
          })
    
    
    res.status(200).json(newDigimon);
        }
    catch (error) {
    console.error('Error creating digimon:', error);
    res.status(500).send('Something went wrong');
  }
}

const deleteDigi = async (req, res) =>{
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
}

module.exports = {
    getAllDigis,
    getPages,
    getUserdigis,
    clearbackground,
    addDigi,
    deleteDigi,
}