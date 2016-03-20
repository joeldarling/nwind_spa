var expect = require('chai').expect;

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
    expect(results[0].name).to.equal('task 1');
  });
  it('has a priority', function(){
    expect(results[0].priority).to.equal(1);
  });
  it('can hold several tasks', function(){
    expect(results.length).to.be.equal(3);
  });
});
