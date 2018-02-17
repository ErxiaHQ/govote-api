/* global describe */
/* global it */

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Base API route', function () {
  it('returns an error if API KEY is missing or invalid', (done) => {
    chai.request(app)
      .get('/')
      .type('form')
      .end((err, res) => {
        if (err) {}
        expect(res).to.have.status(400);
        expect(err.response.text).to.equal('{"message":"Invalid API key","data":{}}');
        done();
      });
  });
  it('returns a welcome response', (done) => {
    chai.request(app)
      .get('/?key=opensource')
      .type('form')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.type).equal('text/plain');
        expect(res.text).equals('Welcome to the GoVote Api');
        done();
      });
  });
});
