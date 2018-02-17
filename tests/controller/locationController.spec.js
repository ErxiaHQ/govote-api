/* global describe */
/* global it */
/* global after */

require('dotenv').config();
const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');
const knex = require('../../db/db');

chai.use(chaiHttp);
const expect = chai.expect;

// ensure you have a test database setup. Database is cleaned up after the test

describe('Location Controller', function () {
  // before((done) => {
  //   // runs before all tests in this block
  // });
  after((done) => {
    // clear db
    knex.raw(`DROP DATABASE ${process.env.DB_NAME};`)
      .then(() => knex.raw(`CREATE DATABASE ${process.env.DB_NAME};`))
      .finally(() => {
        process.exit(0);
      });
  });

  it('index method returns all locations', (done) => {
    chai.request(app)
      .get('/location?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body).to.have.own.property('meta');
        expect(res.body.message).equals('Locations retrieved successfully');
        done();
      });
  });

  it('store method saves a location', (done) => {
    chai.request(app)
      .post('/location?key=opensource')
      .type('form')
      .send({
        name: 'Ikeja High School.',
        address: '1 High School Avenue.',
        area: 'Ikeja',
        state_id: 25
      })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.data.name).equals('Ikeja High School.');
        done();
      });
  });

  it('show method returns a location matching supplied ID', (done) => {
    chai.request(app)
      .get('/location/1?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.message).equals('Location with ID: 1 retrieved');
        // expect(res.body.data.name).equals('Ikeja High School.');
        done();
      });
  });

  it('put method updates a location matching supplied ID', (done) => {
    chai.request(app)
      .put('/location/1?key=opensource')
      .type('form')
      .send({
        name: 'Alimosho High School.',
        address: '1 High School Avenue.',
        area: 'Alimosho',
        state_id: 25
      })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.message).equals('Location with ID: 1 updated');
        expect(res.body.data.name).equals('Alimosho High School.');
        done();
      });
  });

  it('put method returns an error if supplied ID does not exist', (done) => {
    chai.request(app)
      .put('/location/x?key=opensource')
      .type('form')
      .send({
        name: 'Alimosho High School.',
        address: '1 High School Avenue.',
        area: 'Alimosho',
        state_id: 25
      })
      .end((err, res) => {
        if (err) {}
        expect(res).to.have.status(400);
        expect(res.error.text).equals('{"message":"Location with ID: x does not exist","data":{}}');
        done();
      });
  });

  it('put destroy method deletes a location matching the supplied ID', (done) => {
    chai.request(app)
      .del('/location/1?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) {}
        expect(res).to.have.status(200);
        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('data');
        expect(res.body.message).equals('Location with ID: 1 deleted');
        done();
      });
  });
});
