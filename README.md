# Own-RESTful-Wiki-API
<ul>
<li>Creation of API</li>
  <li>Connecting database using Mongoose</li>
  <li>API testing done using Postman</li>
  <li>Use of Express js</li>
  </ul>


  <h2> Server Starting Code </h2>
  <code>
    //jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
  </code>
