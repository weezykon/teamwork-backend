/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
// imports
const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// cloudinary import
// eslint-disable-next-line no-unused-vars
const { resolve } = require('path');
// eslint-disable-next-line no-unused-vars
const { uploader, cloudinaryConfig } = require('./config/cloudinary');
// eslint-disable-next-line no-unused-vars
const { multerUploads } = require('./middleware/multer');
app.use('*', cloudinaryConfig);

// routes
const admin = require('./routes/admin');
const employees = require('./routes/employees');
const posts = require('./routes/posts');
const likes = require('./routes/like');
const comment = require('./routes/comment');

// extracts the JSON object from the request
const bodyParser = require('body-parser');

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors
app.use(cors());

// routes use
app.use(`/api/${process.env.VERSION}/admin`, admin);
app.use(`/api/${process.env.VERSION}/`, employees);
app.use(`/api/${process.env.VERSION}/`, posts);
app.use(`/api/${process.env.VERSION}/like`, likes);
app.use(`/api/${process.env.VERSION}/comment`, comment);

module.exports = app;
