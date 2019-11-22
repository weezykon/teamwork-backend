/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const verify = require('./../middleware/verifyemployee');

// Controllers
const postCtrl = require('../controllers/posts');

// routes
router.get('/articles/user', verify, postCtrl.getPosts);
router.get('/articles/all', verify, postCtrl.getAllPosts);
router.get('/article/:id', verify, postCtrl.getPost);
router.post('/post', verify, postCtrl.createPost);
router.put('/post', verify, postCtrl.updatePost);
router.delete('/post', verify, postCtrl.deletePost);
router.post('/upload', [verify, multer.multerUploads], postCtrl.uploadGif);

module.exports = router;
