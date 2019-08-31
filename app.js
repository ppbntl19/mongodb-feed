//Libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
//Create test data
require('./test_data')();
//server configuration
const port = process.env.PORT || 8080;
const db_url = process.env.M_LAB || "mongodb://localhost:27017/peerlyst";
// Connection to DB///
mongoose.connect(db_url)
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Routes and Backend Funcioncalities
const post = require('./src/routes/post');
const user = require('./src/routes/user');

// App Instance
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/post", post);
app.use("/user", user);


// Execute App
http.listen(port, () => {
  console.log("App's running on: ", port);
});