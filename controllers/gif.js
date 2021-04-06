/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const { pool } = require('./../config/dbconfig');

// fetch user posts
exports.getPosts = async (req, res, next) => {
  // fetch user
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  // eslint-disable-next-line no-underscore-dangle
  const userid = req.user._id;
  // execute query
  await pool.query('SELECT * FROM posts WHERE userid = $1 AND visible = $2 AND type = $3 ORDER BY id DESC', [userid, 1, 'image'], (error, results) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = results.rows;
      res.status(200).json({
        status: 'success', data,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// fetch all posts
exports.getAllPosts = async (req, res, next) => {
  // execute query
  await pool.query('SELECT * FROM posts WHERE visible = $1 AND WHERE type = $2 ORDER BY id DESC', [1, 'image'], (error, results) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = results.rows;
      res.status(200).json({
        status: 'success', data,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// get single post
exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  // execute query
  await pool.query('SELECT * FROM posts WHERE id = $1 AND type = $2 AND visible = $3 ORDER BY id DESC', [id, 'image', 1], (error, results) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = results.rows;
      res.status(200).json({
        status: 'success', data,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// Upload gif
exports.uploadGif = (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    return v2.uploader
      .upload(file, {
        resource_type: 'auto',
      })
      .then(async (result) => {
        const fileUploadedUrl = result.secure_url;
        // eslint-disable-next-line no-underscore-dangle
        const userid = req.user._id;
        const content = fileUploadedUrl;
        const type = 'image';
        const visible = 1;
        // execute query
        await pool.query('INSERT INTO posts (userid, type, content, visible) VALUES ($1, $2, $3, $4)', [userid, type, content, visible], (error, results) => {
          try {
            res.status(201).json({ status: 'success', message: 'Gif added sucessfully.' });
          } catch (error) {
            res.status(404).json({
              error,
            });
          }
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'Something went wrong while processing your request',
          success: false,
          data: {
            err,
          },
        });
      });
  }
};
