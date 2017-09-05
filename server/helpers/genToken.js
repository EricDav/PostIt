import jwt from 'jsonwebtoken';

/**
   * @description gnerate jwt token
   * 
   * @param  {object} currentUser userdetails to be encrypted
   * @param  {string} secret a secret key to be used to encrypt user details
*/

const genToken = (currentUser, secret) => {
  const token = jwt.sign(
    {
      currentUser,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secret
  );
  return token;
};

export default genToken;
