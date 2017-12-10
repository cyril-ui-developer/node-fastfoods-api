import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENEXPIRATIONTIME = (60*60*24) // 24 hours
const SECRET = "W3 Hav3 th3 kn0w h0w";

let authenticate = expressJwt({ secret : SECRET })

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENEXPIRATIONTIME// 24 hours
  });
  next();
}

let response = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
    firstName:req.user.firstName,
    lastName:req.user.lastName
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  response
};
