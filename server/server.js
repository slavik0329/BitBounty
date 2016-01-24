var express         =       require("express");
var multer          =       require('multer');
var app             =       express();
var MongoClient = require('mongodb').MongoClient
var bodyParser     =        require("body-parser");
var ObjectId = require('mongodb').ObjectID;
var easyimg = require('easyimage');

var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 


app.use(cookieParser());
app.use(bodyParser.json())
   .use(bodyParser.urlencoded())


app.use(session({ secret: 'ilovescotchscotchyscotchscotchdsfsd', resave: false, saveUninitialized: false }))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport);
require('./routes.js')(app, passport);



app.listen(8073,function(){
    console.log("Working on port 8073");
});

