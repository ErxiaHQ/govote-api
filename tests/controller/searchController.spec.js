/* global describe */
/* global it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Search Controller', function () {
  // before((done) => {
  //   // runs before all tests in this block
  // });
  // after((done) => {
  //   // clear db
  // });

  it('search method returns an error if search query is missing', (done) => {
    chai.request(app)
      .get('/search?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) {}
        expect(res).to.have.status(400);
        expect(res.error.text).equals('{"message":"search query not sent","data":{}}');
        done();
      });
  });
  // it('search method returns matching locations', (done) => {
  //   chai.request(app)
  //     // .get('/search?query=lagos&key=opensource')
  //     .type('form')
  //     .end((err, res) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log(res)
  //       // expect(res).to.have.status(200);
  //       // expect(res.body).to.have.own.property('message');
  //       // expect(res.body).to.have.own.property('data');
  //       // expect(res.body).to.have.own.property('meta');
  //       // expect(res.body.message).equals('Locations retrieved successfully');
  //       done();
  //     });
  // });
});
