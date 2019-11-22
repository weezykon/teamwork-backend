/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

const verify = require('./../middleware/verifyemployee');

// Controllers
const postCtrl = require('../controllers/posts');

// routes
router.post('/', verify, postCtrl.likePost);

module.exports = router;
