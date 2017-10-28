// seed the db for testing
let RecipeService = require('./routes/recipes');
let p1 = RecipeService.addRecipe({recipeTitle: 'Semo vita', recipeBody: 'This recipe is good for every purpose..'});
let p2 = RecipeService.addRecipe({recipeTitle: 'Rice', recipeBody: 'This recipe is good for every purpose..'});
let p3 = RecipeService.addRecipe({recipeTitle: 'Bread', recipeBody: 'This recipe is good for every purpose..'});

let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');

// Set up the express app
let app = express();
let apiRouter = express.Router();
app.use('/api', apiRouter);
 
let RecipeController = require('./controllers/controller');
let pc = new RecipeController(apiRouter);


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Setup a default catch-all route that sends back a welcome message in JSON format.
/*app.get('*', (req, res) => res.status(200).send(
{
  message: 'Welcome to the beginning of nothingness.',
}
));*/

module.exports = app;