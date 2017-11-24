var uuid = require('node-uuid');
class RecipeService {
    constructor() {
        this.recipes = [];
        this.recipes.id = 0;
    }
 
    getRecipes() {
        return this.recipes;
    }
 
    getSingleRecipe(recipeId) {
      //  var recipe = this.recipes.filter(p => p.id === recipeId)[0];
 var recipe= this.recipes[recipeId];
        return recipe || null;
    }
 
    addRecipe(info) {
        // prevent a bit of bad/duplicate data
    //    if (!info || this.recipes.filter(p => (p.recipeTitle === info.recipeTitle && p.recipeReview === info.recipeBody)).length > 0) {
          //  return false;
     //   }
 
        // info.id = uuid.v4();  
        info.id = this.recipes.id++;
        this.recipes.push(info);
        return true;
    }

    addReview(info) {
        // prevent a bit of bad/duplicate data
        if (!info || this.recipes.filter(p => (p.recipeTitle === info.recipeTitle && p.recipeReview === info.recipeBody)).length > 0) {
            return false;
        }
 
       // info.id = uuid.v4();
        info.id = this.recipes.id ++;
        this.recipes.push(info);
        return true;
    }
 
    updateRecipe(recipeId, info) {
        var recipe = this.getSingleRecipe(recipeId);
        if (recipe) {
            recipe.recipeTitle = info.recipeTitle ? info.recipeTitle : recipe.recipeTitle;
            recipe.recipeBody = info.recipeBody ? info.recipeBody : recipe.recipeBody;
            
 
            return true;
        }
        return false;
    }
    deleteRecipe(recipeId,info){
        var recipe = this.recipes.filter(r => r.id === id)[0];
    }
}
 
module.exports = new RecipeService();