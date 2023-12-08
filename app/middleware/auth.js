const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/UserModel');


const protect = asyncHandler(async (req, res, next) => {

  try {
    let token;

    token = req.headers.authorization;

    const decoded = jwt.verify(token, 'MusicApp@123');
    if (Date.now() <= decoded.exp) {
      return res.status(401).json({ status: false, message: 'Token Expired', data: {} });
    }
    req.user = await User.findById(decoded._id).select('-password');



    if (req.user) {

      next();
    } else {
      res.status(401).json({
        status: false,
        message: 'Not authorized, token failed',
        data: {},
      });
    }

  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Not authorized, token failed',
      data: {},
    });
  }


});



module.exports = { protect };
