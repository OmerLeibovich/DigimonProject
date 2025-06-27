const express = require('express');
const router = express.Router();
const loginController = require('../controllers/logincontroll');

router.route('/login').post(loginController.Checkuser);






module.exports = router;