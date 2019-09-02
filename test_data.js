//Libraries
const express = require('express');
const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id', '__v', "follow"];


//Schema
var Post = require('./src/models/post');
var User = require('./src/models/user');


//Create test user
const user_data = [{
    user: {
      "name": "Uriah Salinas",
      "email": "mauris@lacus.net",
      "bio": "libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et,",
      "type": "member"
    },
    tags_follow: ["information", "https", "network", "corporate", "organizations", "principles"],
    user_follow: [],
    posts: [{
        "title": "Uriah Salinas Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      },
      {
        "title": "Uriah Salinas Post 2Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }, {
        "title": "Uriah Salinas Post 3Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }
    ]
  },
  {
    user: {
      "name": "Keith Moody",
      "email": "et@vitaesemperegestas.net",
      "bio": "neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin",
      "type": "member"
    },
    tags_follow: ["security", "bussiness", "strategic", "corporate", "organizations", "principles"],
    user_follow: ["mauris@lacus.net"],
    posts: [{
        "title": "Keith Moody Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      },
      {
        "title": "Keith Moody Post 2 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }, {
        "title": "Keith Moody Post 3 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }
    ]
  },
  {
    user: {
      "name": "Drew Chambers",
      "email": "gravida.Praesent@Phasellus.co.uk",
      "bio": "Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra",
      "type": "peerlyst"
    },
    tags_follow: ["bussiness", "strategic", "organizations", "principles"],
    user_follow: ["mauris@lacus.net", "et@vitaesemperegestas.net"],
    posts: [{
        "title": "Drew Chambers Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "A"
      },
      {
        "title": "Drew Chambers Post 2 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "B"
      }, {
        "title": "Drew Chambers Post 3 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "A"
      }
    ]
  },
  {
    user: {
      "name": "Merritt Reilly",
      "email": "tristique@lacusCrasinterdum.ca",
      "bio": "taciti sociosqu ad litora torquent per conubia nostra, per inceptos",
      "type": "peerlyst"
    },
    tags_follow: ["information", "https", "network", "security", "bussiness", "strategic"],
    user_follow: ["mauris@lacus.net", "et@vitaesemperegestas.net", "gravida.Praesent@Phasellus.co.uk"],
    posts: [{
        "title": "Merritt Reilly Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "A"
      },
      {
        "title": "Merritt Reilly Post 2 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "B"
      }, {
        "title": "Merritt Reilly Post 3 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "B"
      }
    ]
  },
{
    user: {
      "name": "Merritt Reilly",
      "email": "tristi@lacusCrasinterdum.ca",
      "bio": "taciti sociosqu ad litora torquent per conubia nostra, per inceptos",
      "type": "peerlyst"
    },
    tags_follow: ["information", "https", "network", "security", "bussiness", "strategic"],
    user_follow: ["mauris@lacus.net", "et@vitaesemperegestas.net", "gravida.Praesent@Phasellus.co.uk"],
    posts: [{
        "title": "tristi Reilly Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "A"
      },
      {
        "title": "tristi Reilly Post 2 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "B"
      }, {
        "title": "Metristirritt Reilly Post 3 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "B"
      }
    ]
  },
  {
    user: {
      "name": "Ulric Stuart",
      "email": "eget.ipsum.Suspendisse@risusDonec.ca",
      "bio": "adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem",
      "type": "member"
    },
    tags_follow: ["information", "https", "bussiness", "strategic", "organizations", "principles"],
    user_follow: ["mauris@lacus.net", "tristique@lacusCrasinterdum.ca", "gravida.Praesent@Phasellus.co.uk"],
    posts: [{
        "title": "Ulric Stuart Post 1 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      },
      {
        "title": "Ulric Stuart Post 2 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }, {
        "title": "Ulric Stuart Post 3 Cloud Security: Not For The Faint of Heart",
        "body": "The year 2019 is on its way to setting a record for data breaches, as we have recorded over 3,800 breaches year-to-date, a greater than 50% increase over the last four years. Between 2015 and 2018, the variation in the number of reported breaches was less than 200 incidents per year. But for the first six months of 2019, the number of breaches increased by 54% compared to the same time last year",
        "category": "C"
      }
    ]
  }
];

//Delete
async function delete_dummy_data() {
  try {
    //Remove previous data
    await Post.remove({});
    await User.remove({});
    //Create data
    create_dummy_data();
  }
  catch (error) {
    console.log("error", error)
  }
}
//Create data
function create_dummy_data() {
  //Loop over data and created users post and tags
  async function process_data(i) {
    //Return if done
    if (!user_data[i]) return;
    //get data
    let data = user_data[i];
    //Create new user
    let new_user = new User(data.user);
    //Extend
    new_user.follow.tags = data.tags_follow;
    //check if user fol
    let user_follow = [];
    if (data.user_follow.length) {
      user_follow = await User.find({ email: { "$in": data.user_follow } }).select(' _id').exec();
    }
    //Update auther
    new_user.follow._author = user_follow || [];
    //Save user
    await new_user.save();
    //Save user post
    data.posts.forEach(function(post) {
      //extend
      post.tags = data.tags_follow;
      post._author = new_user._id;
      post.created_by = {
        name: new_user.name,
        type: new_user.type
      };
    });
    //save post
    await Post.insertMany(data.posts);
    //process next
    process_data(i + 1);
  }
  //Start
  process_data(0);
}


//Export
module.exports = delete_dummy_data;
