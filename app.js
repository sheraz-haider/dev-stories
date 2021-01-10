/* global process, __dirname */
require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const routes = require('./routes');

// Don't need body-parser package for express apps 4.16+
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// Static file serving
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Registering all routes
app.use(routes);

// Connecting to database
mongoose.connect(process.env.DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('DB Connected!'));

app.listen(process.env.APP_PORT, () =>
  console.log(`Server running on ${process.env.APP_URL}:${process.env.APP_PORT}/`)
);
