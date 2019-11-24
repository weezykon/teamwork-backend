/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const { pool } = require('./../config/dbconfig');

// check username
const checkUsername = async (db, username) => {
  let response;
  try {
    response = await pool.query(`SELECT * FROM ${db} WHERE username = $1`, [username]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return 'Sorry buddy, Username is already taken';
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

// check email
const checkEmail = async (db, email) => {
  let response;
  try {
    response = await pool.query(`SELECT * FROM ${db} WHERE email = $1`, [email]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return 'Email already exists';
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

const loginUsername = async (db, username) => {
  let response;
  try {
    response = await pool.query(`SELECT * FROM ${db} WHERE username = $1`, [username]);
    const data = response.rows;
    if (data.length === 0) {
      return false;
    }
    return data;
  } catch (error) {
    // handle error
    // do not throw anything
  }
};

module.exports.checkUsername = checkUsername;
module.exports.checkEmail = checkEmail;
module.exports.loginUsername = loginUsername;
