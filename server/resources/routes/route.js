import express from 'express';
// import mailer from 'express-mailer';
import bodyParser from 'body-parser';
import RecipeController from '../controllers/recipeController';
import recipeMidWare from '../middlewares/midware';

const recipeRoute = express();
recipeRoute.use(bodyParser.json());
recipeRoute.use(bodyParser.urlencoded({ extended: false }));
// mailer.extend(recipeRoute, {
//   from: 'no-reply@SinmiMore_Recipe.com',
//   host: 'smtp.gmail.com', // hostname 
//   secureConnection: true, // use SSL 
//   port: 465, // port for secure SMTP 
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
//   auth: {
//     user: 'gmail.user@gmail.com',
//     pass: 'userpass',
//   }
// });
recipeRoute.route('/')
  .get(RecipeController.getRecipe)
  .post(recipeMidWare, RecipeController.addRecipe);
// .get((req, res) => res.send({ message: 'Hello, welcome to more recipe!', message2: req.body }));
recipeRoute.route('/:id')
  .get(RecipeController.getSingleRecipe)
  .put(recipeMidWare, RecipeController.putRecipe)
  .delete(recipeMidWare, RecipeController.delRecipe);
recipeRoute.route('/:id/views')
  .get(RecipeController.getRecipeView);
recipeRoute.route('/:id/reviews')
  .post(recipeMidWare, RecipeController.reviewRecipe);
recipeRoute.route('/:id/favourite')
  .post(recipeMidWare, RecipeController.favourite);
recipeRoute.route('/:id/upvote')
  .post(RecipeController.upVote);
recipeRoute.route('/:id/downvote')
  .post(RecipeController.downVote);
recipeRoute.route('/favourites/category')
  .get(recipeMidWare, RecipeController.getAllCategory)
  .post(recipeMidWare, RecipeController.createCategory);
recipeRoute.route('/:id/favourites/category/:categoryId')
  .post(recipeMidWare, RecipeController.addToCategory);
recipeRoute.route('/favourites/category/:categoryId')
  .get(recipeMidWare, RecipeController.getCategory);
module.exports = recipeRoute;
