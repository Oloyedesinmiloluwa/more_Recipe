import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import recipeRoute from './routes/route';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/v1/recipes', recipeRoute);
module.exports = app;
