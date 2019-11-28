/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// middlewares
const verify = require('./../middleware/verify');

// Controllers
const adminCtrl = require('../controllers/admin');

// rate limit
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
});

// admin routes
router.get('/', adminCtrl.home);
router.get('/employees', [postLimiter, verify], adminCtrl.employees);
router.post('/auth/createuser', [postLimiter, verify], adminCtrl.createUser);

module.exports = router;
