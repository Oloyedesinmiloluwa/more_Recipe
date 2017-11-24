'use strict';
 
var RecipeService = require('../routes/recipes');
 
class RecipeController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }
 
    registerRoutes() {
        this.router.get('/recipes', this.getRecipes.bind(this));
       
        this.router.get('/recipes/:id', this.getSingleRecipe.bind(this));
        this.router.post('/recipes', this.postRecipe.bind(this));
        this.router.post('/recipes/:id/reviews', this.postReview.bind(this));
        this.router.put('/recipes/:id', this.putRecipe.bind(this));
      //  this.router['delete']('/recipes/id', this.deleteRecipe.bind(this));
    }
 
  getRecipes(req, res) {
        var recipes = RecipeService.getRecipes();
        res.send(recipes);
    }
 
    getSingleRecipe(req, res) {
        var id = req.params.id;// //var id = parseInt(req.params.id, 10);
        var recipe = RecipeService.getSingleRecipe(id);
 
        if (!recipe) {
            res.sendStatus(404);
        } else {
            res.send(recipe);
        }
    }
 
    putRecipe(req, res) {
        //var id = parseInt(req.params.id, 10);
        var id = req.params.id;
        var existingRecipe = RecipeService.getSingleRecipe(id);
 
        if (!existingRecipe) {
            var recipeInfo = req.body;
            recipeInfo.id = id;
            if (RecipeService.addRecipe(recipeInfo)) {
                res.setHeader('Location', '/recipes/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (RecipeService.updateRecipe(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }
 
    postRecipe(req, res) {
        var recipeInfo = req.body;
        console.log(recipeInfo);
        if (RecipeService.addRecipe(recipeInfo)) {
            res.setHeader('Location', '/recipes/' + recipeInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
    deleteRecipe(req, res) {
        var id = parseInt(req.params.id, 10);        
    }
    postReview(req, res) {
        var recipeInfo = req.body;
 
        if (RecipeService.addReview(recipeInfo)) {
            res.setHeader('Location', '/recipes/' + recipeInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}
 
module.exports = RecipeController;