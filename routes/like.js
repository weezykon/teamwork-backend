/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const verify = require('./../middleware/verifyemployee');

// Controllers
const postCtrl = require('../controllers/posts');

// rate limit
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
});

// routes
router.post('/', [postLimiter, verify], postCtrl.likePost);

module.exports = router;
