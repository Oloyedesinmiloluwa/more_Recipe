import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';

class UserController {
  static getUser(req, res) {
    return db.User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
  static signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // return db.User.destroy({
    //   where: {
    //     email: 'sinmi@yahoo.com'
    //   }
    // });
    return db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || '',
        notify: false,
        categoryId: [],
        favourite: [],
      })
      // .then(user => res.status(201).send(user))
      .then((user) => {
        const { id, email, firstName, lastName } = user;
        const token = jwt.sign({ id, email, firstName, lastName }, process.env.secret_key, { expiresIn: '1h' });
        process.env.token = token;
        return res.status(201).send({message: 'Successfully Created & You\'re logged in'});
      })
      .catch(error => (res.status(400).json(error)));
  }
  static signIn(req, res) {
    // ought to check here
    return db.User
      .find({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(404).send('User does not exist');
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((response) => {
            if (response) {
              const { id, email, firstName, lastName } = user;
              const token = jwt.sign({ id, email, firstName, lastName }, process.env.secret_key, { expiresIn: '1h' });
              process.env.token = token;
              return res.status(200).send('Login Successful');
            }
            return res.status(401).send('Invalid Password');
          })
          .catch(error => res.status(404).send(error.message));
      })
      .catch(error => res.status(404).send(error.message));
  }
  static getFavourite(req, res) {
    db.User
      .findById(req.params.userId)
      .then((user) => {
        if (user.favourite === null) return res.status(404).send('You have no favourite recipe');
        db.Recipe
          .findAll({ where: { id: user.favourite } })
          .then((recipes) => {
            return res.status(200).send(recipes);
          })
          .catch(error => res.status(404).send(error.message));
      })
      .catch(error => res.status(404).send('You are not signed in, pls do so to continue'));
  }
}
// db.User
    //   .findAll({ attribute: 'favourite' })
    //   // .find({ attribute: 'favourite' })
    //   .then((favourites) => {
        
    //     return res.send(favourites);
module.exports = UserController;
