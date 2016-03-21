var expect = require('chai').expect;

var request = require('supertest-as-promised')(require('../app'));

describe('/', function(){
  it('loads the home page', function(){

    return request.get('/')
      .expect(200)
      .then(function(res){
        expect(res.text).to.contain('Task');
      });
  });
});

describe('POST /task', function(){

  var _id;

  it('can add a new task', function(){

    request.post('/task')
    .send({name: 'task xyz', priority: 1})
    .expect(201)
    .then(function(res){

      expect(res.body.name).to.equal('task xyz');
      expect(res.body.priority).to.equal(1);
      _id = res.body._id;
      return request.get('/');
    });
  });
  it('database retains the new task', function(){
    return request.get('/task')
    .expect(200)
    .then(function(res){
      expect(res.body.length).to.equal(4);
    });
  });


  it('can delete a task', function(){
    return request.delete('/task/' + _id)
    .expect(200)
    .then(function(result){
      expect(result.body.length).to.equal(3);
    });

  });


});
