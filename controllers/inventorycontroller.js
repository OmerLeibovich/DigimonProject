const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Applies an inventory item to a specific Digimon and updates both
const useitem = async (req,res) =>{
  const itemid = req.body.itemid;
  const digimonid = req.body.digimonid;
  const userid = req.body.userid;
  const stat = req.body.stat;
   try{
      await prisma.inventory.update({
        where: {
          userId_itemId: {
            userId: parseInt(userid),
            itemId: parseInt(itemid),
          }
        },
        data: {
          quantity: { decrement: 1 } 
        }
      })

      const digimon = await prisma.digimon.findUnique({
         where:{
          id : parseInt(digimonid),
        },
      })

      let digistat = parseInt(digimon[stat]);
      digistat++;
      const upstat = await prisma.digimon.update({
        where:{
          id : parseInt(digimonid),
        },
        data:{
          [`${stat}`]: digistat.toString() 
        }

      })
      res.status(200).json(upstat);

   }
     catch(error){
      console.error('Error get digimon information:', error);
    res.status(500).send('Something went wrong');
  }

}

//Fetches all inventory items owned by the user (quantity > 0) and renders them
const getalluseritems = async (req,res) =>{
  try{
  const id = req.query.id;
  const type = req.query.type;
  let index = parseInt(req.query.index);

  let useritems = await prisma.inventory.findMany({
  where: {
    userId: parseInt(id),
      quantity: {
      gt: 0,  
    },
  },
  select: {
      quantity: true,
      itemId: true,  
    item: {
      select: {
        id: true,
        name: true,
        description: true,
        photo: true,
      }
    }
  },
  orderBy:{
    itemId:'asc',
  }
});
  if (!useritems){
    useritems = [];
  }
      if (index < 0) index = useritems.length - 1;
      if (index >= useritems.length) index = 0;
  if (type === "mobile") {
    res.render('inventorySystem/inventoryMobile', {useritems,index})
  }
  else{
    res.render('inventorySystem/inventorypage', {useritems})
  }
  }
 catch (error){
      console.error('Error fetching useritems:', error);
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
    useitem,
    getalluseritems,
    }

