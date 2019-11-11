import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import express from 'express';

var MongoClient = require('mongodb').MongoClient;

const MongoURL = "mongodb+srv://admin:admin@cluster0-n5sgi.mongodb.net/pets-match?retryWrites=true&w=majority";


// MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
//   if (err) {
//     throw err;
//   }
//   db.collection('mammals').find().toArray(function(err, result) {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// });

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from Express!!!'});
});

WebApp.connectHandlers.use(app);