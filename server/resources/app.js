import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import recipeRoute from './routes/route';
import UserRoute from './routes/UserRoute';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/v1/recipes', recipeRoute);
app.use('/api/v1/users', UserRoute);
module.exports = app;
