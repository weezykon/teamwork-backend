/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const { pool } = require('./../config/dbconfig');

// check employeeusername
const checkEmployeeUsername = async (username) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM employees WHERE username = $1', [username]);
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

// check admin username
const checkAdminUsername = async (username) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
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

// check admin email
const checkAdminEmail = async (email) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
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

// check admin email
const checkEmployeeEmail = async (email) => {
  let response;
  try {
    response = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
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

module.exports.checkEmployeeUsername = checkEmployeeUsername;
module.exports.checkAdminUsername = checkAdminUsername;
module.exports.checkEmployeeEmail = checkEmployeeEmail;
module.exports.checkAdminEmail = checkAdminEmail;
