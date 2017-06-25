import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import controllers from './server/controllers/';

const port = process.env.PORT || 8000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
controllers(app);

app.listen(port);
