import express from 'express';
import logger from 'morgan';
import winston from 'winston';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.dev';
import routes from './server/routes';

const port = process.env.PORT || 8000;
const app = express();
app.use(express.static('public')); // configure static files folder
app.use(logger('dev'));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
  winston.info(`server started on ${port}`);
});
export default app;
