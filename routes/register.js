const express = require('express');
const router = express.Router();
const registerController = require('../contorller/registerController');

router.post('/',registerController.handleNewUser);

module.exports = router;