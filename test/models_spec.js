var expect = require('chai').expect;

var green = require('../utils/utils').green;
var red = require('../utils/utils').red;

var db = require('../db');
var Task = require('../db').models.Task;

describe('Task Model', function(){
  var results;

  beforeEach(function(done){
    db.seed()
    .then(function(){
      return Task.find({});
    })
    .then(function(result){
      results = result;
      done();
    },done);

  });

  it('exists', function(){
    expect(Task).to.be.ok;
  });

  it('has a name', function(){
    expect(results[0].name).to.equal('test');
  });
  it('has a priority', function(){
    expect(results[0].priority).to.equal(1);
  });
});
