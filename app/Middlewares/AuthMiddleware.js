/* global process */
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports = async function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res
      .status(401)
      .json({ errors: { token: ['Missing Access Token'] } });

  try {
    const verifiedUser = jwt.verify(token, process.env.APP_KEY);
    const user = await User.findById(verifiedUser._id).exec();
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ errors: { token: ['Session expired! Please Log back in.'] } });
    }

    return res.status(500).json({ errors: { server: [err] } });
  }
};
