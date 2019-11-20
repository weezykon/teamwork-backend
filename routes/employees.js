/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

const verify = require('./../middleware/verify');

// Controllers
const adminCtrl = require('../controllers/admin');

// admin routes
router.get('/', verify, adminCtrl.getEmployees);
router.post('/', verify, adminCtrl.getEmployee);
router.post('/login', adminCtrl.loginEmployee);

module.exports = router;
