var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({

  name: String,
  priority: { type: Number }

});

taskSchema.statics.getAll = function(){
  return this.find({});
};

var Task = mongoose.model('Task', taskSchema);

var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN || 'mongodb://localhost/northwind_spa_db', function(err){
        if(err)
          return reject(err);
        resolve(mongoose.connection);
    });
  });
  return _conn;
}

function seed(){

  return connect()
    .then(function(){
      return Task.remove({});
    })
    .then(function(result){

      return Task.create({ name: 'task 1', priority: 1 });
    })
    .then(function(result){

      return Task.create({ name: 'task 2', priority: 10 });
    })
    .then(function(result){

      return Task.create({ name: 'task 3', priority: 100});
    });

}

module.exports = {
  connect: connect,
  models:{
    Task: Task
  },
  seed: seed
};
