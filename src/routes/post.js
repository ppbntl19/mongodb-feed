const express = require('express');
const router = express.Router();
// Load method categories.
const _ = require('underscore');
//Schema
const Post = require('../models/post');
const User = require('../models/user');


// find game information
router.get('/', async (req, res) => {
  try {
    //Get user data 
    const user = await User.findOne({ $or: [ { _id: req.query.user_id }, { email: req.query.user_email } ]}).exec();
    //Get require paramenters
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 15;

    //Get related post
    Post.aggregate([
      { $sort: { "posts.created": 1, "category": 1 } },
      {
        "$match": {
          $and: [{
            _author: { $ne: user._id },
            "$or": [
              { tags: { $in: user.follow.tags } },
              { _author: { $in: user.follow._author } },
              { "category": { $in: ["A", "B"] } }
            ]
          }]
        },
      },
      {
        "$group": {
          "_id": "$category",
          count: { $sum: 1 },
          posts: { $push: "$$ROOT" }
        }
      }
    ]).exec((err, result) => {
      //If err return
      if (err || (!result && !result.length)) {
        res.status(400).json({
          type: "error",
          error: "Unable to fetch records",
          payload: []
        });
      }
      //Respose for client
      const respose = [];
      //Get different post category
      const member = _.findWhere(result, { _id: "C" });
      const peerlyst_A = _.findWhere(result, { _id: "A" });
      const peerlyst_B = _.findWhere(result, { _id: "B" });
      //Create respose 
      function create_response(i) {
        //Return if record not exist anymore
        if (!member.posts[i] && !member.posts[i + 1] && !peerlyst_A.posts[i] && !peerlyst_B.posts[i]) return;
        //Push different records
        if (member.posts[i]) respose.push(member.posts[i]);
        if (member.posts[i + 1]) respose.push(member.posts[i + 1]);
        if (peerlyst_A.posts[i]) respose.push(peerlyst_A.posts[i]);
        if (peerlyst_B.posts[i]) respose.push(peerlyst_B.posts[i]);
        //Process another record
        create_response(i + 1);
      }
      //Start process
      create_response(0);
      //Slice record to support page initiation
      res.status(200).json({
        type: "success",
        message: "Successfull feteched",
        payload: respose.slice(skip, skip + limit)
      });
    });

  }
  catch (err) {
    res.status(400).json({
      type: "error",
      error: "Unable to fetch user details",
      payload: []
    });
  }
  // Post.aggregate([

  //   {
  //     "$match": {
  //       "$or": [
  //         { tags: { $in: user.follow.tags } },
  //         { _author: { $in: user.follow._author } },
  //       ]
  //     },
  //   },
  //         {
  //     "$group": {
  //       "_id": "$category",
  //       count: { $sum: 1 },
  //       posts: { $push: "$$ROOT" }
  //     }
  //   },
  //   {
  //     "$match": { "category": { $in: ["B"] } 
  //     },
  //   },
  //       {
  //     "$group": {
  //       "_id": "$category",
  //       count: { $sum: 1 },
  //       posts: { $push: "$$ROOT" }
  //     }
  //   },

  //   {
  //     "$match": { "category": { $in: ["A"] } 
  //     },
  //   },
  //     {
  //     "$group": {
  //       "_id": "$category",
  //       count: { $sum: 1 },
  //       posts: { $push: "$$ROOT" }
  //     }
  //   },
  //   { "$skip": 0 },
  //   { "$limit": 10 },
  //   //{ $sort: { "posts.created": 1 } }
  // ]).exec(function(err, res) {
  //   console.log(err, res)
  // })

});

module.exports = router;