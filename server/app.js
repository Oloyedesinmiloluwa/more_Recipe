var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Set up the express app
var app = express();
var apiRouter = express.Router();
app.use('/api', apiRouter);
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var RecipeController = require('./controllers/controller');
var pc = new RecipeController(apiRouter);
// seed the db for testing
var RecipeService = require('./routes/recipes');
var p1 = RecipeService.addRecipe({recipeTitle: 'Semo vita', recipeBody: 'This recipe is good for every purpose..'});
var p2 = RecipeService.addRecipe({recipeTitle: 'Rice', recipeBody: 'This recipe is good for every purpose..'});
var p3 = RecipeService.addRecipe({recipeTitle: 'Bread', recipeBody: 'This recipe is good for every purpose..'});

// Log requests to the console.
app.use(logger('dev'));

/* // Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */



// Setup a default catch-all route that sends back a welcome message in JSON format.
/*app.get('*', (req, res) => res.status(200).send(
{
  message: 'Welcome to the beginning of nothingness.',
}
));*/
//app.get('*',(req,res)=>res.status(200).send({message:"Hello, welcome to more recipe!"}));
app.post('/', (req, res) => res.send({ message: 'Hello, welcome to more recipe!', message2: req.body }));
module.exports = app;
