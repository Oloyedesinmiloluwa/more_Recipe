import express from 'express';
import bodyParser from 'body-parser';
import UserController from '../controllers/userController';
import recipeMidWare from '../middlewares/midware';

const userRoute = express();
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: false }));
userRoute.route('/signup')
// .get(UserController.getRecipe) get all users
  .post(UserController.signUp);
userRoute.route('/signin')
  .post(UserController.signIn);
userRoute.route('/')
  .get(recipeMidWare, UserController.getUser);
userRoute.route('/:userId/recipes')
  .get(recipeMidWare, UserController.getFavourite);
userRoute.route('/signout')
  .post((req, res) => {
    process.env.token = null;
    res.sendStatus(200);
  });
module.exports = userRoute;
