const express = require('express');
const router = express.Router();
const registerontroller = require('../controllers/registercontroller');

router.route('/register').post(registerontroller.adduser);
router.route('/verify/:token').get(registerontroller.confirm_email);



module.exports = router;