const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getshopitems = async (req,res) =>{
  try{
    const shopitems = await prisma.item.findMany();

    res.render('shopSystem/shoppage', {shopitems})
  }
 catch (error){
      console.error('Error fetching shopitems:', error);
    res.status(500).send('Something went wrong');
  }
}


module.exports = {
    getshopitems,
}
