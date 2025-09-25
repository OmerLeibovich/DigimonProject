const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopcontroller');



router.route('/getshopitems').get(shopController.getshopitems);
router.route('/additem').post(shopController.buyitem);



module.exports = router;