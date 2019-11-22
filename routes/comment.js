/* eslint-disable import/newline-after-import */
// imports
const express = require('express');
const router = express.Router();

const verify = require('./../middleware/verifyemployee');

// Controllers
const commentCtrl = require('../controllers/posts');

// routes
router.post('/', verify, commentCtrl.commentPost);

module.exports = router;
