const { PrismaClient } = require('@prisma/client');
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
    console.error('Error fetching digimons:', error);
    res.status(500).send('Something went wrong');
  }
  }


const getPages = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    const element = req.query.element;
    let count = 0; 
    if (!userId) return res.status(401).send("Unauthorized");
    if (element === "digimons"){
    count = await prisma.digimon.count({
      where: { userid: userId }
    });
  }
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
   const evolveDigimon = await prisma.digimon.update({
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
  res.status(200).json(evolveDigimon);

  }
  catch (error){
      console.error('Error evolve digimon:', error);
    res.status(500).send('Something went wrong');
  }
}



const updateEXP = async (req,res) => {
  try{
    const id = req.body.id;
    const exp = req.body.exp;
    const result = req.body.result;
    const userid = req.body.userid;

    const digimonDetails = await prisma.digimon.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  const user = await prisma.user.findUnique({
    where:{
      id:parseInt(userid),
    }
  })
  let newExperience = parseInt(digimonDetails.experience) + parseInt(exp);
  let newlvl = digimonDetails.level;
  let maxexp = digimonDetails.levelUPExp;
  let attack = parseInt(digimonDetails.attack);
  let defense = parseInt(digimonDetails.defense);
  let hp = parseInt(digimonDetails.hp);
  if(newExperience < 0){
    newExperience = 0;
  }
  if (newExperience > parseInt(digimonDetails.levelUPExp)){
    newlvl += 1;
    newExperience = 0;
    maxexp +=30
    hp++;
    attack++;
    defense++;
  }
  let newMoney;
  if (result === "wins"){
  newMoney = user.money + 30;
  }
  else{
  newMoney = user.money;
  }
  await prisma.user.update({
      where:{
      id:parseInt(userid),
    },
    data:{
      money: newMoney,
    }
  })

  req.session.user.money = newMoney;

  await prisma.digimon.update({
      where: {
      id: parseInt(id),
    },
      data:{
        experience : newExperience,
        level: newlvl,
        levelUPExp:maxexp,
        attack: attack.toString(),
        defense: defense.toString(),
        hp: hp.toString(),
         [`${result}`]: {
      increment: 1
    }
    }
  })

    res.status(200).json({newMoney: newMoney});
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
    const level = parseInt(req.body.Level);
    const attribute = req.body.Attribute;
    const hp = req.body.Hp;
    const attack = req.body.Attack;
    const defense = req.body.Defense;
    const experience = 0;
    const levelUpExp = level * 40;
    const money = req.body.userMoney;
    const userid = req.session.user?.id;
      if (!userid) {
      return res.status(401).send('Unauthorized: no user session');
    }
    if(money >= 100){
    let newMoney = money-100;
    
  await prisma.user.update({
      where: {
      id: userid,
    },
      data:{
        money : newMoney,
    }
  })

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
    
    
    res.status(200).json({
      newDigimon,
      newMoney: newMoney,
    });
        }
      else{
        console.error('dont have enough money to buy new digimon');
        res.status(400).send('dont have enough money to buy new digimon');
        }
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
    updateEXP,
    evolveDigimon,
    addDigi,
    deleteDigi,
}