/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const { pool } = require('./../config/dbconfig');
const { validateCreateArticle } = require('./../middleware/validation');
const { multerUploads, dataUri } = require('./../middleware/multer');
const { v2, cloudinaryConfig } = require('./../config/cloudinary');

const { validatePost } = require('./../middleware/validation');

// fetch user posts
exports.getPosts = async (req, res, next) => {
  // fetch user
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  // eslint-disable-next-line no-underscore-dangle
  const userid = req.user._id;
  // execute query
  await pool.query('SELECT * FROM posts WHERE userid = $1 AND visible = $2 AND type = $3 ORDER BY id DESC', [userid, 1, 'text'], (error, results) => {
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
  await pool.query('SELECT * FROM posts WHERE visible = $1 AND WHERE type = $2 ORDER BY id DESC', [1, 'text'], (error, results) => {
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
exports.feeds = async (req, res, next) => {
  // execute query
  await pool.query('SELECT * FROM posts WHERE visible = $1 ORDER BY id DESC', [1], (error, results) => {
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
  await pool.query('SELECT * FROM posts WHERE id = $1 AND type = $2 AND visible = $3 ORDER BY id DESC', [id, 'text', 1], (error, results) => {
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

// create post
exports.createPost = async (req, res, next) => {
  // validate input
  const { error } = validateCreateArticle(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // eslint-disable-next-line no-underscore-dangle
  const userid = req.user._id;
  const { title, content } = req.body;
  const type = 'text';
  const visible = 1;
  // execute query
  await pool.query('INSERT INTO posts (userid, type, title, content, visible) VALUES ($1, $2, $3, $4, $5)', [userid, type, title, content, visible], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'Post added sucessfully.' });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

// Update Post
exports.updatePost = async (req, res, next) => {
  const { postid, title, content } = req.body;
  await pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, postid], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'Post Updated Sucessfully.' });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

// Delete Post
exports.deletePost = async (req, res, next) => {
  const { postid } = req.body;
  await pool.query('UPDATE posts SET visible = $1 WHERE id = $2', [0, postid], async (error, updateResults) => {
    try {
      await pool.query('DELETE FROM likes WHERE postid = $1', [postid], (error, results) => {
        try {
          res.status(201).json({ status: 'success', message: 'Deleted Successfully.' });
        } catch (error) {
          res.status(404).json({
            error,
          });
        }
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};

// Like Post
exports.likePost = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const userid = req.user._id;
  const { postid } = req.body;
  // execute query
  await pool.query('SELECT * FROM likes WHERE userid = $1 AND postid = $2 AND type = $3', [userid, postid, 'text'], async (error, likesResults) => {
    try {
      if (likesResults.rows === undefined || likesResults.rows.length === 0) {
        await pool.query('INSERT INTO likes (userid, postid) VALUES ($1, $2)', [userid, postid], (error, results) => {
          try {
            res.status(201).json({ status: 'success', message: 'Sucessful.' });
          } catch (error) {
            res.status(404).json({
              error,
            });
          }
        });
      } else {
        await pool.query('DELETE FROM likes WHERE userid = $1 AND postid = $2', [userid, postid], (error, results) => {
          try {
            res.status(201).json({ status: 'success', message: 'Sucessful.' });
          } catch (error) {
            res.status(404).json({
              error,
            });
          }
        });
      }
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// Comment Post
exports.commentPost = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const userid = req.user._id;
  const { postid, comment } = req.body;
  // execute query
  await pool.query('INSERT INTO comments (userid, postid, comment) VALUES ($1, $2, $3)', [userid, postid, comment], (error, results) => {
    try {
      res.status(201).json({ status: 'success', message: 'Comment Added Sucessfully.' });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  });
};
