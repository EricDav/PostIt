import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.secretKey;

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {} next
 * @description auntheticate user by checking if a user has a token or a valid token
 * @return {object} success or failure message. success if user has a valid token,
 * failure if user do not have a token or a valid token.
 */

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
export default auth;
