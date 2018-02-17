/* global describe */
/* global it */
const chai = require('chai');
const expect = chai.expect;
// import location model
const { Location } = require('../../models/Location');

describe('Location model test', function () {
  const location = new Location({
    id: '1',
    name: 'Community Voting Centre',
    address: '1 Community Road',
    area: 'Ikeja',
    city_id: 1,
    state_id: 25,
    latitude: 12345,
    longitude: 12345
  });

  it('returns a Location instance', () => {
    expect(location instanceof Location).to.be.true;
  });

  it('during instatiation rejects any property not predefined', () => {
    const location = new Location({
      id: '1',
      name: 'Community Voting Centre',
      address: '1 Community Road',
      area: 'Ikeja',
      city_id: 1,
      state_id: 25,
      latitude: 12345,
      longitude: 12345,
      username: 'fancyhacker'
    });
    expect(location.hasOwnProperty('username')).to.be.false;
  });

  it('has an all method', function () {
    expect(typeof location.all).to.equal('function');
  });

  it('has a find method', function () {
    expect(typeof location.find).to.equal('function');
  });

  it('has a store method', function () {
    expect(typeof location.store).to.equal('function');
  });

  it('has a save method', function () {
    expect(typeof location.save).to.equal('function');
  });

  it('has a destroy method', function () {
    expect(typeof location.destroy).to.equal('function');
  });

  it('has a withOne method', function () {
    expect(typeof location.withOne).to.equal('function');
  });
});
