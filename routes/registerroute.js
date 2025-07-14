const express = require('express');
const router = express.Router();
const registerontroller = require('../controllers/registercontroller');

router.route('/register').post(registerontroller.adduser);
router.route('/resetpassword').post(registerontroller.resetpassword);
router.route('/verify/:token').get(registerontroller.confirm_email);
router.route('/confirmReset').put(registerontroller.confirm_reset_password);



module.exports = router;