var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var green = require('./utils/utils').green;
var red = require('./utils/utils').red;

var app = express();

module.exports = app;

app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/', require('./routes'));

app.listen(3000, function(){

  green('server listening on 3000');

});
