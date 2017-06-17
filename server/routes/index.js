const userController = require('../controllers/user');

console.log(userController.create);

module.exports = (app) => {
  app.post('api/user/signup', userController.create);
};
