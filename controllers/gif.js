/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const { pool } = require('./../config/dbconfig');
const { validateCreateArticle } = require('./../middleware/validation');

const { validatePost } = require('./../middleware/validation');

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
