var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({

  name: String,
  priority: { type: Number }

});

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

      return Task.create({ name: 'test', priority: 1 });
    });

}

module.exports = {
  connect: connect,
  models:{
    Task: Task
  },
  seed: seed
};
