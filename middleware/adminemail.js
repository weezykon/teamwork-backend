/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
const { pool } = require('./../config/dbconfig');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  await pool.query('SELECT * FROM admin WHERE email = $1', [email], (error, results) => {
    try {
      if (results.rows === undefined || results.rows.length === 0) {
        next();
      }
      return res.status(400).json({
        message: 'Email Already Exists',
      });
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line no-empty
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line no-empty
    } catch (error) {}
  });
};
