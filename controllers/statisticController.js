const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getstatisticData = async (req,res) =>{
  try{
    const id = parseInt(req.query.id);
    let loses = 0;
    let wins = 0;
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
    res.status(200).json({ values });
  }
  catch(error){
      console.error('Error get digimon information:', error);
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
    getstatisticData,
}