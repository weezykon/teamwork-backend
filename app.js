/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
// imports
const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// routes
const admin = require('./routes/admin');

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

module.exports = app;
