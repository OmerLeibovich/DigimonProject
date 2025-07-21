const express = require('express');
const router = express.Router();
const digimonController = require('../controllers/digimoncontroll');


router.route('/getDigis').get(digimonController.getAllDigis);
router.route('/addDigimon').post(digimonController.addDigi);
router.route('/deleteDigimon').delete(digimonController.deleteDigi);
router.route('/getpages').get(digimonController.getPages);
router.route('/getuserdigis').get(digimonController.getUserdigis);
// router.route('/remove-bg').post(digimonController.clearbackground);
router.route('/updateEXP').put(digimonController.updateEXP);
router.route('/evolve').put(digimonController.evolveDigimon);
router.route('/chartdata').get(digimonController.getstatisticData);
router.route('/getshopitems').get(digimonController.getshopitems);



module.exports = router;