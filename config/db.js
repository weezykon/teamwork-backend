/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const dotenv = require('dotenv');
dotenv.config();
// connection
const db = process.env.DB_CONNECT;

module.exports = db;
