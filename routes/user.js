/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

const verify = require('../middleware/verifyemployee');

// Controllers
const userCtrl = require('../controllers/user');

// admin routes
router.get('/users', verify, userCtrl.getUsers);
router.post('/auth/login', userCtrl.loginUser);

module.exports = router;
