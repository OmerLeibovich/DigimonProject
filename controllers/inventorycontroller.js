const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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

const buyitem = async(req,res) =>{
  try{
  const itemid = req.body.itemid;
  const userid = req.body.userid;
  const amount = req.body.amount;
  const money = req.body.money;

  let newMoney = money - (100*amount);
  req.session.user.money = newMoney;
  const updateMoney = await prisma.user.update({
    where:{
      id: parseInt(userid)
    },
    data:{
      money: newMoney,
    }
  })
  const checkItem = await prisma.inventory.findFirst({
    where:{
      userId:  parseInt(userid),
      itemId: parseInt(itemid),
    }
  })
  if (checkItem){
    let newamount = parseInt(amount)+ checkItem.quantity;
    const updateitem = await prisma.inventory.update({
      where:{
        id : checkItem.id,
      },
      data:{
        quantity: newamount,
      }
    })
    res.status(200).json({
      updateitem,
      newMoney: newMoney
    });
  }

  else{
  const newitem = await prisma.inventory.create({
    data:{
      quantity: parseInt(amount),
      userId: parseInt(userid),
      itemId: parseInt(itemid),
    }
    })
     res.status(200).json(newitem);
  }
}
    catch (error){
      console.error('Error fetching buy item:', error);
    res.status(500).send('Something went wrong');
  }

}

const getalluseritems = async (req,res) =>{
  try{
  const id = req.query.id;

  const useritems = await prisma.inventory.findMany({
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
    quantity:'asc',
  }
});
  if (!useritems){
    useritems = [];
  }
    res.render('inventorySystem/inventorypage', {useritems})
  }
 catch (error){
      console.error('Error fetching useritems:', error);
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
    useitem,
    getalluseritems,
    buyitem,
    }