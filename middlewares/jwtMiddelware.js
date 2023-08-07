const jwt = require('jsonwebtoken');

exports.getData=async (req, res) => {
  try {
      const token = req.headers.authorization;
      const secretKey = "MoHmggQ8ZyCb";
      const verified = jwt.verify(token, secretKey);
      if (verified) {
          res.send('Successfull!')
      } else {
          res.send('Invalid Token!')
      }
  } catch (e) {
      return res.send('Invalid Token!');
  }
};