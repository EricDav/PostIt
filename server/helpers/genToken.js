import jwt from 'jsonwebtoken';

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
