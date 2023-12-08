const jwt = require('jsonwebtoken');

const generateToken = id => {
  return jwt.sign({_id:id}, 'MusicApp@123', {
    expiresIn: '60d',
  });
};

module.exports = generateToken;
