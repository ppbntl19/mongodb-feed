var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//Schema
var User = require('../models/user');

router.get('/', function(req, res){
  User.find( {}, function(error, users){
    return  res.status(200).json({
      type: "success",
      payload: users
    });
  });
});


module.exports = router;