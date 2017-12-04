import recipes from '../models/dummy';

class RecipeController {
  static findRecipeIndex(req) {
    const recipe = recipes.filter(value => value.id === parseInt(req.params.id, 10));
    return recipes.indexOf(recipe[0]);
  }
  static getRecipe(req, res) {
    return res.send(recipes);
  }
  static getSingleRecipe(req, res) {
    // console.log(RecipeController.findRecipeIndex(req));
    if (RecipeController.findRecipeIndex(req) !== -1) {
      return res.send(recipes[RecipeController.findRecipeIndex(req)]);
    }
    return res.sendStatus(404);
  }
  static addRecipe(req, res) {
    if (req.body.recipeTitle === undefined || req.body.recipeBody === undefined) {
      return res.status(200).send({ message: 'You must include a recipeTitle and recipeBody' });
    }
    req.body.id = recipes[recipes.length - 1].id + 1;
    req.body.review = [];
    req.body.upVote = 0;
    req.body.downVote = 0;
    recipes.push(req.body);
    return res.sendStatus(200);
  }
  static delRecipe(req, res) {
    if (RecipeController.findRecipeIndex(req) === -1) return res.sendStatus(404);
    recipes.splice(RecipeController.findRecipeIndex(req), 1);
    return res.sendStatus(204);
    // return res.status(200).json({ message: 'worked!', recipes });
  }
  static putRecipe(req, res) {
    if (RecipeController.findRecipeIndex(req) === -1) return res.sendStatus(404);
    req.body.id = RecipeController.findRecipeIndex(req);
    req.body.review = [];
    req.body.upVote = 0;
    req.body.downVote = 0;
    recipes.splice(RecipeController.findRecipeIndex(req), 1, req.body);
    return res.sendStatus(200);
  }
  static reviewRecipe(req, res) {
    if (RecipeController.findRecipeIndex(req) === -1) {
      return res.sendStatus(404);
    }
    if (req.body.name === undefined || req.body.review === undefined) {
      return res.status(200).send({ message: 'name or content missing!' });
    }
    recipes[RecipeController.findRecipeIndex(req)].review.push(req.body);
    return res.sendStatus(200);
  }
}
module.exports = RecipeController;
