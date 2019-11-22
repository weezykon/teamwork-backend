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

// fetch user contents
exports.getPosts = async (req, res, next) => {
  // fetch user
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  // eslint-disable-next-line no-underscore-dangle
  const userid = user._id;
  // execute query
  await pool.query('SELECT * FROM posts WHERE userid = $1 ORDER BY id DESC', [userid], (error, results) => {
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

// fetch all contents
exports.getAllPosts = async (req, res, next) => {
  // fetch user
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  // eslint-disable-next-line no-underscore-dangle
  const userid = user._id;
  // execute query
  await pool.query('SELECT * FROM posts ORDER BY id DESC', (error, results) => {
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

exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  // execute query
  await pool.query('SELECT * FROM posts WHERE id = $1 ORDER BY id DESC', [id], (error, results) => {
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
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  // validate input
  const { error } = validateCreateArticle(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // eslint-disable-next-line no-underscore-dangle
  const userid = user._id;
  const { title, content } = req.body;
  const type = 'text';
  const visible = 1;
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

exports.uploadGif = (req, res, next) => {
  const token = req.header('auth-token');
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  if (req.file) {
    const file = dataUri(req).content;
    return v2.uploader
      .upload(file, {
        resource_type: 'auto',
      })
      .then(async (result) => {
        const fileUploadedUrl = result.secure_url;
        // eslint-disable-next-line no-underscore-dangle
        const userid = user._id;
        const content = fileUploadedUrl;
        const type = 'image';
        const visible = 1;
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
