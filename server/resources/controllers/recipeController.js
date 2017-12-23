import jwt from 'jsonwebtoken';
import db from '../models/index';
import sendMail from '../middlewares/mailsender';


// remove s from upvote
// make upvote integer datatype
// try to modulize find recipe
class RecipeController {
  static findRecipeIndex(req, res) {
    // const recipe = recipes.filter(value => value.id === parseInt(req.params.id, 10));
    // return recipes.indexOf(recipe[0]);
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe;
      })
      .catch(error => res.status(400).send(error));
  }
  static getRecipe(req, res) {
    if (req.query.sort) {
      return db.Recipe
        .findAll({ order: [[req.query.sort, req.query.order.toUpperCase()]] })
        .then(recipes => res.status(200).send(recipes))
        .catch(() => res.status(400).send('Invalid query pls check carefully'));
    }
    if (req.query.ingredient) {
      req.query.ingredient = req.query.ingredient.split(',');
      return db.Recipe
        .findAll({
          where: { ingredient: { $contains: req.query.ingredient } },
        })
        .then(recipes => res.status(200).send(recipes))
        .catch(error => res.send(400).send(error));
    }
    return db.Recipe
      .all()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send(error));
  }
  static getSingleRecipe(req, res) {
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (process.env.token !== 'null') {
          jwt.verify(process.env.token, process.env.secret_key, (error, decoded) => {
            if (error) return res.status(500).send(error.message);
            req.decoded = decoded;
          });
          if (recipe.views[0] !== req.decoded.id) {
            recipe.views.push(req.decoded.id);
            recipe
              .update({
                views: recipe.views,
              })
              .then()
              .catch(error => res.status(400).send(error));
          }
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  }
  static addRecipe(req, res) {
    if (req.body.name === undefined || req.body.description === undefined) {
      return res.status(400).send({ message: 'You must include a name and description' });
    }
    if (req.body.ingredient) req.body.ingredient = req.body.ingredient.split(',');
    else req.body.ingredient = [];
    return db.Recipe.create({
      // id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      userId: req.decoded.id,
      review: [],
      upvotes: 0, // 0
      downvotes: 0, // 0
      ingredient: req.body.ingredient,
      views: [req.decoded.id], // automatic view for recipe creator
      // categoryId:
    })
      .then(recipe => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
  }
  static delRecipe(req, res) {
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId !== req.decoded.id) return res.status(403).send('Unauthorized user');
        return recipe
          .destroy()
          .then(() => res.status(200).send('Successfully Deleted'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static putRecipe(req, res) {
    if (req.body.review) return res.status(400).send('pls remove review from request body');
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId !== req.decoded.id) return res.status(403).send('unauthorized user');
        return recipe
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => {
            db.User
              .findAll({ attributes: ['email', 'notify'],
                where: { favourite: { $contains: [recipe.id] } }
              })
              .then((users) => {
                const filteredEmails = [];
                for (let i = 0; i < users.length; i++) {
                  if (users[i].notify) filteredEmails.push(users[i].email);
                }
                console.log(filteredEmails);
                const mailOptions = {
                  from: 'no_reply@sinmiMoreRecipe.com', to: filteredEmails, subject: 'New Review from more_Recipe',
                  html: '<p> Hi there ' + recipe.name + ': one of your favourite recipes has been modified, Click this link to see the changes </p>' }
                sendMail(mailOptions);
              })
              .catch(error => res.status(400).send(error));
            res.status(200).send(recipe);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static getRecipeView(req, res) {
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        res.status(200).send('The num of time viewed is ' + recipe.views.length)
      })
      .catch(error => res.status(400).send(error));
  }
  static reviewRecipe(req, res) {
    if (req.body.review === undefined) return res.status(400).send({message: 'Review field cannot be empty'});
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        recipe.review.push(req.body.review);
        recipe
          // .update(req.body.review, { fields: ['review'] })
          .update({ review: recipe.review }) // { where: { id: req.params.id } 
          .then(() => {
            db.User
              .findById(recipe.userId)
              .then((user) => {
                if (user.notify) {
                  const mailOptions = {
                    from: 'no_reply@sinmiMoreRecipe.com', to: user.email, subject: 'New Review from more_Recipe',
                    html: '<p> Hey you got a new review for ' + recipe.name + ' Click this link to visit </p>' }
                  sendMail(mailOptions);
                }
              })
              .catch(error => res.status(400).send(error));
            res.status(200).send(recipe);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static favourite(req, res) {
    db.User
      .findById(req.decoded.id)
      .then((user) => {
        if (user.favourite === null) user.favourite = [];
        if (user.favourite.indexOf(parseInt(req.params.id, 10)) !== -1) return res.status(400).send('This recipe is already a favourite!');
        user.favourite.push(req.params.id);
        user
          .update({ favourite: user.favourite })
          .then(() => {
            res.status(200).send('favourited!');
          })
          .catch(error => res.status(200).send(error));
      })
      .catch(error => res.status(200).send(error));
  }
  static createCategory(req, res) {
    return db.Category
      .create({
        name: req.body.name,
        recipeCatalog: [4], // correct migratiom
        image: req.body.image || '',
      })
      .then((category) => {
        db.User
          .findById(req.decoded.id)
          .then((user) => {
            user.categoryId.push(category.id);
            user
              .update({
                categoryId: user.categoryId,
              })
              // .then()
              .catch(error => res.status(400).send(error));
            res.status(200).send(category);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static addToCategory(req, res) {
    return db.Category
      .findById(req.params.categoryId)
      .then((category) => {
        if (category.recipeCatalog.indexOf(parseInt(req.params.id, 10)) !== -1) return res.status(400).send('This recipe is already in this category!');
        category.recipeCatalog.push(parseInt(req.params.id, 10));
        category
          .update({
            recipeCatalog: category.recipeCatalog,
          })
          .then(() => res.status(200).send(category))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static getCategory(req, res) {
    return db.Category
      .findById(req.params.categoryId)
      .then((category) => {
        db.Recipe
          .findAll({
            where:
        {
          id: category.recipeCatalog,
        },
          })
          .then((recipes) => {
            res.status(200).send(recipes);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static getAllCategory(req, res) {
    return db.Category
      .all()
      .then(category => res.status(200).send(category))
      .catch(error => res.status(400).send(error));
  }
  static searchByIngredient(req, res) {
    req.query.ingredient = req.query.ingredient.split(',');
    return db.Recipe
      .findAll({
        where: { ingredient: req.query.ingredient },
      })
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.send(400).send(error));
  }
  static upVote(req, res) {
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        recipe.upvotes += 1;
        return recipe
          .update({ upvotes: recipe.upvotes }) // { where: { id: req.params.id } 
          .then(() => res.status(200).send(recipe))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    // if (RecipeController.findRecipeIndex(req, res).upvotes === null) RecipeController.findRecipeIndex(req, res).upvotes = [0];
    // RecipeController.findRecipeIndex(req, res).upvotes[0] = RecipeController.findRecipeIndex(req, res).upvotes[0] + 1;
    // RecipeController.findRecipeIndex(req, res)
    //   .update({ upvotes: RecipeController.findRecipeIndex(req, res).upvotes[0] })
    //   .then(() => res.status(200).send(RecipeController.findRecipeIndex(req, res)))
    //   .catch();
  }
  static downVote(req, res) {
    return db.Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        // recipe.downvotes.push(req.body.downvotes);
        recipe.downvotes += 1;
        return recipe
          .update({ downvotes: recipe.downvotes }) // { where: { id: req.params.id } 
          .then(() => res.status(200).send(recipe))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
module.exports = RecipeController;
