/* global describe */
/* global it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Search Controller', () => {
  it('search method returns an error if search query is missing', (done) => {
    chai.request(app)
      .get('/search?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) { }
        expect(res).to.have.status(400);
        expect(res.error.text).equals('{"message":"search query not sent","data":{}}');
        done();
      });
  });
});
