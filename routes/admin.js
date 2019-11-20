/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

// middlewares
const verify = require('./../middleware/verify');

// Controllers
const adminCtrl = require('../controllers/admin');

// admin routes
router.get('/', verify, adminCtrl.getAdmins);
router.post('/', verify, adminCtrl.createAdmin);
// router.post('/createEmployee', verify, adminCtrl.createEmployee);
router.post('/login', adminCtrl.loginAdmin);

module.exports = router;
