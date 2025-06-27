const express = require('express');
const router = express.Router();
const digimonController = require('../controllers/digimoncontroll');


router.route('/getDigis').get(digimonController.getAllDigis);
router.route('/addDigimon').post(digimonController.addDigi);
router.route('/deleteDigimon').delete(digimonController.deleteDigi);





module.exports = router;