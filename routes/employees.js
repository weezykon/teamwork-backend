/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

const verify = require('./../middleware/verifyemployee');

// Controllers
const employeeCtrl = require('../controllers/employees');

// admin routes
router.get('/employees', verify, employeeCtrl.getEmployees);
router.post('/login', employeeCtrl.loginEmployee);

module.exports = router;
