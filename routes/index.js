var express = require('express');

var router = express.Router();

var db = require('../db');

var Task = db.models.Task;

db.connect();

module.exports = router;

router.get('/', function(req, res, next){

  //home page
  res.redirect('/index.html');

});

router.get('/task', function(req, res, next){
  Task.getAllSorted()
  .then(function(result){
    res.status(200).send(result);
  }, next);
});

router.post('/task', function(req, res, next){
  Task.create({
    name: req.body.name,
    priority: req.body.priority
  })
  .then(function(result){
    res.status(201).send(result);
  },next);
});

router.put('/task/:id/:priority', function(req, res, next){
  Task.findOne({_id: req.params.id})
  .then(function(task){
    task.priority = req.params.priority;
    return task.save();
  })
  .then(function(result){
    res.send(result);
  });
});

router.delete('/task/:id', function(req, res, next){
  Task.findOneAndRemove({_id: req.params.id})
  .then(function(){
    return Task.find({});
  })
  .then(function(result){
    res.status(200).send(result);
  });
});
