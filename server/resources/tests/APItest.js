// import chai from 'chai';
import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import recipeRoute from '../routes/route';
import userRoute from '../routes/UserRoute';


// const chai = require('chai');
// const assert = require('chai');
// // const assert = require('assert');
// const chaiHttp = require('chai-http');
// const recipeRoute = require('../routes/route');
process.env.NODE_ENV = 'test';
dotenv.config();
const should = chai.should();
chai.use(chaiHttp);
describe('Test for Recipes API endpoint', () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(userRoute)
        .post('/signup')
        .send({ firstName: 'Grace', lastName: 'Love', email: 'sinmiloluwasunday@yahoo.com', password: 'test' })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully Created & You\'re logged in');
          done();
        });
    });
  });
  describe('/POST recipe', () => {
    it('It should NOT add recipe without title and content', (done) => {
      chai.request(recipeRoute)
        .post('/')
        .send({
          name: 'Grape',
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'You must include a name and description');
          done();
        });
    });
    it('It should add a new recipe', (done) => {
      const req = {};
      chai.request(recipeRoute)
        .post('/')
        .send({ name: 'Grape', description: 'Grape is a delicious meal', image: '/.jpg' })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.name, 'Grape');
          done();
        });
    });
  });
  describe('/GET recipe', () => {
    it('It should get all recipes', (done) => {
      chai.request(recipeRoute)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
    it('It should get a single recipe', (done) => {
      chai.request(recipeRoute)
        .get('/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(1);
          assert.isObject(res.body, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(recipeRoute)
        .get('/900000')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('/PUT recipe', () => {
    it('It should update a recipe', (done) => {
      chai.request(recipeRoute)
        .put('/1')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/POST review', () => {
    it('It should add a review to a recipe', (done) => {
      chai.request(recipeRoute)
        .post('/1/reviews')
        .send({review: 'I love this meal!' })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.id, 1);
          done();
        });
    });
    it('It should not add an incomplete review', (done) => {
      chai.request(recipeRoute)
        .post('/1/reviews')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Review field cannot be empty');
          // assert.equal(res.body.message, 'name or content missing!');
          done();
        });
    });
  });
  describe('/delete recipe', () => {
    it('It should delete an existing recipe', (done) => {
      chai.request(recipeRoute)
        .delete('/1')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('It should NOT process an invalid recipe ID', (done) => {
      chai.request(recipeRoute)
        .delete('/900000')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
