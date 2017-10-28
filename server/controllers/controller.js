'use strict';
 
let RecipeService = require('../routes/recipes');
 
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
        let recipes = RecipeService.getRecipes();
        res.send(recipes);
    }
 
    getSingleRecipe(req, res) {
        let id = req.params.id;// //let id = parseInt(req.params.id, 10);
        let recipe = RecipeService.getSingleRecipe(id);
 
        if (!recipe) {
            res.sendStatus(404);
        } else {
            res.send(recipe);
        }
    }
 
    putRecipe(req, res) {
        //let id = parseInt(req.params.id, 10);
        let id = req.params.id;
        let existingRecipe = RecipeService.getSingleRecipe(id);
 
        if (!existingRecipe) {
            let recipeInfo = req.body;
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
        let recipeInfo = req.body;
        console.log(recipeInfo);
        if (RecipeService.addRecipe(recipeInfo)) {
            res.setHeader('Location', '/recipes/' + recipeInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
    deleteRecipe(req, res) {
        let id = parseInt(req.params.id, 10);
        
    }

  

    postReview(req, res) {
        let recipeInfo = req.body;
 
        if (RecipeService.addReview(recipeInfo)) {
            res.setHeader('Location', '/recipes/' + recipeInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}
 
module.exports = RecipeController;