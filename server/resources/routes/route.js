import express from 'express';
import bodyParser from 'body-parser';
import RecipeController from '../controllers/recipeController';

const recipeRoute = express();
recipeRoute.use(bodyParser.json());
recipeRoute.use(bodyParser.urlencoded({ extended: false }));
recipeRoute.route('/')
  .get(RecipeController.getRecipe)
  .post(RecipeController.addRecipe);
// .get((req, res) => res.send({ message: 'Hello, welcome to more recipe!', message2: req.body }));
recipeRoute.route('/:id')
  .get(RecipeController.getSingleRecipe)
  .put(RecipeController.putRecipe)
  .delete(RecipeController.delRecipe);
recipeRoute.route('/:id/reviews')
  .post(RecipeController.reviewRecipe);
module.exports = recipeRoute;
