/* eslint-disable consistent-return */
/* eslint-disable func-names */
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.header('Authorization')) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({ status: 'error', message: 'Access Denied' });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      if (verified.role === 'admin') {
        return res.status(400).send({ status: 'error', message: 'Token Invalid' });
      }
      next();
    } catch (error) {
      return res.status(400).send({ status: 'error', message: 'Token Invalid' });
    }
  } else {
    return res.status(400).send({ status: 'error', message: 'You do not have access to this platform' });
  }
};
