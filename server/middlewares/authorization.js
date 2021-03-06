import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.secretKey;

/**
 * @description auntheticate user by checking
 *  if a user has a token or a valid token
 * 
 * @param  {object} req request object
 * @param  {object} res response object
 * @param  {} next callback
 * 
 * @return {object} success or failure message.
 * success if user has a valid token
 * failure if user do not have a token or a valid token.
 */

const authorization = (req, res, next) => {
  let token = req.body.token || req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.' });
      }
      req.currentUser = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
export default authorization;
