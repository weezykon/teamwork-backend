/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./../config/dbconfig');
const { validateLogin } = require('./../middleware/validation');

// login admin
exports.loginEmployee = async (req, res) => {
  // validate input
  const { error } = validateLogin(req.body);
  if (error) {
    const errMessage = error.details[0].message.replace('"', '');
    return res.status(404).json({
      message: errMessage,
    });
  }
  // execute query
  const { email, password } = req.body;
  await pool.query('SELECT * FROM employees WHERE email = $1', [email], async (error, results) => {
    try {
      // return if email is wrong
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).json({
          status: 'error', message: 'Invalid Login Credentials',
        });
      }
      const user = results.rows[0];
      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          status: 'error', message: 'Invalid Login Credentials',
        });
      }
      // Json Web Token
      const token = jwt.sign({ _id: user.id, role: 'employee' }, process.env.TOKEN_SECRET);
      const userData = {
        // eslint-disable-next-line max-len
        name: user.fullname, email: user.email, username: user.username, phone: user.phone, date: user.date, gender: user.gender,
      };
      res.status(201).json({
        status: 'success', message: 'Logged in sucessfully.', token, user: userData,
      });
    } catch (error) {
      res.status(404).json({
        error, status: 'error',
      });
    }
  });
};

// get all employees
exports.getEmployees = async (req, res, next) => {
  // fetch user
  const token = req.header('auth-token');
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  // execute query
  await pool.query('SELECT id,fullname,email,city,username,phone,marital_status,gender,date FROM employees', (error, results) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = results.rows.filter((row) => row.id !== verified._id);
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
