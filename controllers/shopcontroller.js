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
      res.status(200).json({
      newitem,
      newMoney: newMoney
    });
     res.status(200).json(newitem);
  }
}
    catch (error){
      console.error('Error fetching buy item:', error);
    res.status(500).send('Something went wrong');
  }

}


module.exports = {
    getshopitems,
    buyitem,
}
