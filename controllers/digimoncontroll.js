const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const prisma = new PrismaClient();






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
  const page = req.query.page;
  try{
      if (!req.session?.user?.id) {
      return res.status(401).send('Unauthorized');
    }
     const digimons = await prisma.digimon.findMany({
      where: { userid: req.session.user.id },
      orderBy: { level: 'asc' }
    });
    if (page === 'statistic'){
      res.render('DigimonSystem/statistic',{digimons});
    }
    else{
    res.render('DigimonSystem/userdigimons', { digimons });
    }
  }
  catch (error){
      console.error('Error fetching user digis:', error);
    res.status(500).send('Something went wrong');
  }
}


const evolveDigimon = async (req,res) =>{
  try{
    const id = req.body.id;
    const evolve = req.body.evolve;
    const rank = req.body.rank;
    const hp = req.body.hp;
    const attack = req.body.attack;
    const defense = req.body.defense;
    console.log(hp,attack,defense,rank);
   const updateEvolve = await prisma.digimon.update({
      where: {
      id: parseInt(id),
    },
      data:{
        photo : evolve.images[0].href,
        rank : rank,
        type : evolve.attributes[0].attribute,
        name : evolve.name,
        hp: hp.toString(),
        attack: attack.toString(),
        defense: defense.toString(),

    }
  })
  res.status(200).json(updateEvolve);

  }
  catch (error){
      console.error('Error evolve digimon:', error);
    res.status(500).send('Something went wrong');
  }
}

// const clearbackground = async (req, res) => {
//   try {
//     const photo = req.body.imageUrl
//     exec(`rembg i ${photo} ${cleanedImage}`, (error, stdout, stderr) => {
//     });
//     res.send({ cleanedImageUrl: cleanedImage});
//   } catch (error) {
//     console.error("Error clearing background:", error.response?.data || error.message);
//     res.status(500).send("Something went wrong");
//   }
// };

const updateEXP = async (req,res) => {
  try{
    const id = req.body.id;
    const exp = req.body.exp;
    const result = req.body.result;

    const digimonDetails = await prisma.digimon.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  var newExperience = parseInt(digimonDetails.experience) + parseInt(exp);
  var newlvl = parseInt(digimonDetails.level);
  var maxexp = parseInt(digimonDetails.levelUPExp);
  if(newExperience < 0){
    newExperience = 0;
  }
  if (newExperience > parseInt(digimonDetails.levelUPExp)){
    newlvl += 1;
    newExperience = 0;
    maxexp +=30
  }

  console.log("levelUPExp:", digimonDetails.levelUPExp, typeof digimonDetails.levelUPExp);
  console.log("experience:", digimonDetails.experience, typeof digimonDetails.experience);
  console.log("newExperience:", newExperience);

  const updateExp = await prisma.digimon.update({
      where: {
      id: parseInt(id),
    },
      data:{
        experience : newExperience,
        level: newlvl.toString(),
        levelUPExp:maxexp,
        [`${result}`]: 1
    }
  })

    res.status(200).json(updateExp);
  }
  catch (error) {
    console.error('Error creating digimon:', error);
    res.status(500).send('Something went wrong');
  }
}
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


const getstatisticData = async (req,res) =>{
  try{
    const id = parseInt(req.query.id);
    var loses = 0;
    var wins = 0;
    if(req.query.userid === 'true'){
      const check = await prisma.digimon.findMany({
        where:{
          userid: id,
        }
      })
      check.forEach(digi => {
        loses += digi.loses;
        wins += digi.wins;
      });
    }
    else{
      const digimon = await prisma.digimon.findFirst({
        where:{
          id: id,
        }
      })
      loses=digimon.loses;
      wins=digimon.wins;
    }
    const values = [wins,loses];
    console.log(values);
    res.status(200).json({ values });
  }
  catch(error){
      console.error('Error get digimon information:', error);
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
    getAllDigis,
    getPages,
    getUserdigis,
    updateEXP,
    evolveDigimon,
    // clearbackground,
    addDigi,
    deleteDigi,
    getstatisticData,
}