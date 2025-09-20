const express = require('express');
const router = express.Router();
const digimonController = require('../controllers/digimoncontroller');


router.route('/getDigis').get(digimonController.getAllDigis);
router.route('/addDigimon').post(digimonController.addDigi);
router.route('/deleteDigimon').delete(digimonController.deleteDigi);
router.route('/getpages').get(digimonController.getPages);
router.route('/getuserdigis').get(digimonController.getUserdigis);
router.route('/updateEXP').put(digimonController.updateEXP);
router.route('/evolve').put(digimonController.evolveDigimon);



module.exports = router;