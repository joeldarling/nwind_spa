var express = require('express');
var bodyParser = require('body-parser');
//var morgan = require('morgan');
var green = require('./utils/utils').green;
var red = require('./utils/utils').red;

var app = express();

module.exports = app;

app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//only useful for inital route testing
//app.use(morgan('dev'));

app.use('/', require('./routes'));

//how about a server file-- this way we won't start listening when we are doing testing.
app.listen(3000, function(){

  green('server listening on 3000');

});
