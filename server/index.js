// main starting point of the application
const express = require('express');
const http = require('http'); // <- native node library
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();
// ^ an instance of express


// DB Setup
// --------
mongoose.connect('mongodb://localhost:notes/notes')


// App Setup
// ---------
app.use(passport.initialize());
app.use(bodyParser.json({type: '*/*'}));
app.use(cors());
app.use(morgan('combined'));

router(app);


// Server Setup
// ------------
// before adding a script to use nodemon would run server by 'node index.js' command
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port)
