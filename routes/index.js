var express = require('express');

var router = express.Router();

var db = require('../db').models.Task;

module.exports = router;

router.get('/', function(req, res, next){

  //home page
  res.sendFile('index.html');

});

router.get('/task', function(req, res, next){
  db.find({})
  .then(function(result){
    res.send(result);
  }, next);
});

router.post('/task', function(req, res, next){
  db.create({
    name: req.body.name,
    priority: req.body.priority
  })
  .then(function(result){
    res.status(201).send(result);
  },next);
});

router.delete('/task', function(req, res, next){
  db.findOneAndRemove({name: req.body.name})
  .then(function(){
    return db.find({});
  })
  .then(function(result){
    res.status(200).send(result);
  });
});
