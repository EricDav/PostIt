const userController = require('../controllers').user;

module.exports = (app) => {
  app.post('api/user/signup', userController.create);
};
