import userController from '../controllers/user';
import groupController from '../controllers/grup';
import groupMembersController from '../controllers/groupMember';
import groupPostsController from '../controllers/grouPost';
import loginController from '../controllers/login';
import auth from '../middlewares/auth';

const routes = (app) => {
  app.get('/api/allUsers', userController.allUsers);
  app.post('/api/group', auth, groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', groupMembersController.create);
  app.post('/api/group/:postId/message', groupPostsController.create);
  app.post('/api/user/signin', loginController.findUser);
};
export default routes;
