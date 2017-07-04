import express from 'express';
import logger from 'morgan';
import winston from 'winston';
import bodyParser from 'body-parser';
import routes from './server/routes';

const port = process.env.PORT || 8000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);


app.listen(port, () => {
  winston.info(`server started on ${port}`);
});
export default app;
