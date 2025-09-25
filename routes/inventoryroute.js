const express = require('express');
const router = express.Router();
const itemController = require('../controllers/inventorycontroller');


router.route('/getuseritems').get(itemController.getalluseritems);
router.route('/useitem').put(itemController.useitem);



module.exports = router;