/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

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
router.get('/articles', [postLimiter, verify], postCtrl.getAllPosts);
router.get('/feeds', [postLimiter, verify], postCtrl.feeds);
router.get('/article/:id', [postLimiter, verify], postCtrl.getPost);
router.post('/articles', [postLimiter, verify], postCtrl.createPost);
router.patch('/articles', [postLimiter, verify], postCtrl.updatePost);
router.delete('/articles', [postLimiter, verify], postCtrl.deletePost);

module.exports = router;
