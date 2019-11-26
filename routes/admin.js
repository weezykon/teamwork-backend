/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

// middlewares
const verify = require('./../middleware/verify');

// Controllers
const adminCtrl = require('../controllers/admin');

// admin routes
router.get('/employees', verify, adminCtrl.employees);
router.post('/auth/createuser', verify, adminCtrl.createUser);

module.exports = router;
