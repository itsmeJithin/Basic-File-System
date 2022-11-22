const jwt = require('jsonwebtoken');

module.exports = {
  signJwtToken(data, expiresIn = "1h") {
    console.log(data);
    return jwt.sign(data.toJSON(), process.env.SIGN_IN_SECRET, {expiresIn: expiresIn})
  }
};

