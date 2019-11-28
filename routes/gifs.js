/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const multer = require('../middleware/multer');

const verify = require('./../middleware/verifyemployee');

// rate limit
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
});

// Controllers
const gifsCtrl = require('../controllers/gif');

// routes
router.get('/gifs/user', [postLimiter, verify], gifsCtrl.getPosts);
router.get('/gifs', [postLimiter, verify], gifsCtrl.getAllPosts);
router.get('/gifs/:id', [postLimiter, verify], gifsCtrl.getPost);
router.post('/gifs', [postLimiter, verify, multer.multerUploads], gifsCtrl.uploadGif);

module.exports = router;
