const express = require("express");
const path = require("path");
const env = require("dotenv").config();
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
const app = express();
const Mongoose = require('mongoose');
const port = process.env.PORT;
const dbUrl = process.env.DBURL;

// Setting path for public directory 
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
Mongoose.connect(dbUrl, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
}).then((db) => {
   console.log('[app.js] Connected to the database')
}, err => {
   console.log('[app.js] Can\'t connect to the database' + err)
})

Mongoose.Promise = global.Promise

// Server Setup
app.listen(port, () => {
   console.log(`[app.js] Server is running at ${port}`)
});

app.use(require('./api/UserApi'));

////----//// JSWT-SIMPLE ////----////

// var payload = { foo: 'bar' };

// // encode
// var token = jwt.encode(payload, secret);
// console.log('Encode:', token);

// // decode
// var decoded = jwt.decode(token, secret);
// console.log('Decoded', decoded.foo);
