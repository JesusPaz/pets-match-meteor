import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import express from 'express';

const app = express();

const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;
const MongoURI = "mongodb+srv://admin:admin@cluster0-n5sgi.mongodb.net/pets-match?retryWrites=true&w=majority";

MongoClient.connect(MongoURI, { useUnifiedTopology: true, useNewUrlParser: true, },
  function (err, database) {
    if (err) throw err;

    db = database.db("pets-match");
    WebApp.connectHandlers.use(app);
  });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

// Method to login in the server. in the body rcv the user and password
app.post('/api/login', (req, res) => {

  const user = req.body.user
  const password = req.body.password

  const users = db.collection("users");

  users.find({ "user": user }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 1) {
        if (result[0].password == password) {
          res.status(200).json({ message: 'User data is OK' });
        } else {
          res.status(401).json({ message: 'User or password do not match' });
        }
      } else {
        res.status(401).json({ message: 'User do not exists' });
      }
    }
  });
});
