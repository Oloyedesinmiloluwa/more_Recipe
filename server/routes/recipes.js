'use strict';
 
let uuid = require('node-uuid');
 
class RecipeService {
    constructor() {
        this.recipes = ["jhekjle"];
        this.recipes.id=0;
    }
 
    getRecipes() {
        return this.recipes;
    }
 
    getSingleRecipe(recipeId) {
      //  let recipe = this.recipes.filter(p => p.id === recipeId)[0];
 let recipe= this.recipes[recipeId];
        return recipe || null;
    }
 
    addRecipe(info) {
        // prevent a bit of bad/duplicate data
    //    if (!info || this.recipes.filter(p => (p.recipeTitle === info.recipeTitle && p.recipeReview === info.recipeBody)).length > 0) {
          //  return false;
     //   }
 
        // info.id = uuid.v4();
        info.id =5// this.recipes.id ++;
        console.log(info);
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
        let recipe = this.getSingleRecipe(recipeId);
        if (recipe) {
            recipe.recipeTitle = info.recipeTitle ? info.recipeTitle : recipe.recipeTitle;
            recipe.recipeBody = info.recipeBody ? info.recipeBody : recipe.recipeBody;
            
 
            return true;
        }
        return false;
    }
    deleteRecipe(recipeId,info){
        let recipe = this.recipes.filter(r => r.id === id)[0];
    }
}
 
module.exports = new RecipeService();