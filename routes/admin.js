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
router.post('/login', adminCtrl.loginAdmin);
router.get('/employees', verify, adminCtrl.employees);
router.post('/employees', verify, adminCtrl.createEmployee);

module.exports = router;
