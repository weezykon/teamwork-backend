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
const postCtrl = require('../controllers/posts');

// routes
router.get('/articles/user', [postLimiter, verify], postCtrl.getPosts);
router.get('/articles/all', [postLimiter, verify], postCtrl.getAllPosts);
router.get('/article/:id', [postLimiter, verify], postCtrl.getPost);
router.post('/post', [postLimiter, verify], postCtrl.createPost);
router.put('/post', [postLimiter, verify], postCtrl.updatePost);
router.delete('/post', [postLimiter, verify], postCtrl.deletePost);
router.post('/upload', [postLimiter, verify, multer.multerUploads], postCtrl.uploadGif);

module.exports = router;
