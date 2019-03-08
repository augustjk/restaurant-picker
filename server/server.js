const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiController = require('./apiController');
const userController = require('./userController');

mongoose.connect(`mongodb+srv://augustine:${process.env.DB_PASS}@cluster0-e811w.azure.mongodb.net/test?retryWrites=true`, {useNewUrlParser: true, useCreateIndex: true}, err => {
    if (err) next(err);
    console.log('Connected to DB');
  });

app.use(bodyParser.json());
app.use(cookieParser());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/check', userController.checkCookie, (req, res) => {
  res.json(res.locals);
});

app.post('/api/yelp', apiController.requestList, (req, res) => {
  res.json(res.locals.data.businesses);
});

app.post('/signin', userController.verifyUser, (req, res) => {
  res.json(res.locals.data);
});

app.post('/register', userController.createUser);

app.post('/save', userController.saveFavorite);

app.get('/signout', userController.signout);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
