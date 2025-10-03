const express = require('express');
const router = express.Router();
const loginController = require('../controllers/logincontroller');

router.route('/login').get(loginController.Checkuser);






module.exports = router;