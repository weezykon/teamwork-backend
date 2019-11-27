/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const verify = require('../middleware/verifyemployee');

// Controllers
const userCtrl = require('../controllers/user');

// rate limit
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
});

// admin routes
router.get('/users', [postLimiter, verify], userCtrl.getUsers);
router.post('/auth/login', postLimiter, userCtrl.loginUser);

module.exports = router;
