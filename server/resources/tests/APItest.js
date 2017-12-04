// import chai from 'chai';
import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import recipeRoute from '../routes/route';

// const chai = require('chai');
// const assert = require('chai');
// // const assert = require('assert');
// const chaiHttp = require('chai-http');
// const recipeRoute = require('../routes/route');

const should = chai.should();
chai.use(chaiHttp);
describe('Test for Recipes API endpoint', () => {
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
    it('It should get a single recipes', (done) => {
      chai.request(recipeRoute)
        .get('/0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(0);
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
  describe('/POST recipe', () => {
    it('It should NOT add recipe without title and content', (done) => {
      const recipe = { recipeTitle: 'Grape' };
      chai.request(recipeRoute)
        .post('/')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'You must include a recipeTitle and recipeBody');
          done();
        });
    });
    it('It should add a new recipe', (done) => {
      const recipe = { recipeTitle: 'Grape', recipeBody: 'Grape is a delicious meal' };
      chai.request(recipeRoute)
        .post('/')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/PUT recipe', () => {
    it('It should update a recipe', (done) => {
      chai.request(recipeRoute)
        .put('/0')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('/delete recipe', () => {
    it('It should delete an existing recipe', (done) => {
      chai.request(recipeRoute)
        .delete('/1')
        .end((err, res) => {
          res.should.have.status(204);
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
  describe('/POST review', () => {
    it('It should add a review to a recipe', (done) => {
      let review = { name: 'paul', content: 'I love this meal!' };
      chai.request(recipeRoute)
        .post('/0/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('It should not add an incomplete review', (done) => {
      let review = { name: 'paul' };
      chai.request(recipeRoute)
        .post('/0/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({ message: 'name or content missing!' });
          // assert.equal(res.body.message, 'name or content missing!');
          done();
        });
    });
  });
});

