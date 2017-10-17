import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.dev';
import group from './server/routes/groupRoutes';
import user from './server/routes/userRoutes';
import message from './server/routes/messageRoutes';
import forgetPassword from './server/routes/forgetPasswordRoutes';

const port = process.env.PORT || 7000;
const app = express();
app.use(express.static(path.join(__dirname, './client')));

app.use(logger('dev'));
if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(group);
app.use(user);
app.use(message);
app.use(forgetPassword);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
export default app;
