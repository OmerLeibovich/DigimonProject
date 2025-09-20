const express = require('express');
const router = express.Router();
const loginController = require('../controllers/logincontroller');

router.route('/login').post(loginController.Checkuser);






module.exports = router;