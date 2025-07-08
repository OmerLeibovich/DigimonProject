const express = require('express');
const router = express.Router();
const registerontroller = require('../controllers/registercontroller');

router.route('/register').post(registerontroller.adduser);






module.exports = router;