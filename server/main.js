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


// Method to sing up in the server. in the body rcv the user and password
app.post('/api/singup', (req, res) => {

  const user = req.body.user
  const password = req.body.password
  const email = req.body.email

  const users = db.collection("users");

  users.find({ "user": user }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 0) {

        var newUser = {
          "user": user, "password": password, "email": email, likePets: [],
          dislikePets: []
        };

        users.insertOne(newUser, function (err, res) {
          if (err) throw err;
        });

        res.status(200).json({ message: 'User added successfully' });
      } else {
        res.status(401).json({ message: 'User already exists' });
      }
    }
  });
});


// Method to get the next dog
app.get('/api/pets/next/:username', (req, res) => {

  const user = req.params.username

  const users = db.collection("users");
  const pets = db.collection("pets");

  users.find({ "user": user }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 1 && user) {
        var likePets = result[0].likePets;
        var dislikePets = result[0].dislikePets

        pets.find({ "owner": { $ne: user } }).toArray(function (err, result) {
          if (err) {
            console.log(err)
          } else {
            var isPetCorrect = false
            var timesToFind = 0
            result.some(function (nextPet) {
              timesToFind++
              if (likePets.indexOf(nextPet._id.toString()) === -1 && dislikePets.indexOf(nextPet._id.toString()) === -1) {
                res.status(200).json({
                  id: nextPet._id,
                  image: nextPet.image,
                  name: nextPet.name,
                  age: nextPet.age,
                  gender: nextPet.gender,
                  breed: nextPet.breed,
                  isSterialized: nextPet.isSterialized,
                  isReproduced: nextPet.isReproduced,
                  city: nextPet.city,
                  country: nextPet.country,
                  owner: nextPet.owner
                });
                isPetCorrect = true
              }
              return isPetCorrect
            });
            if (!isPetCorrect) {
              res.status(401).json({ message: 'You do not have more pets to see, try it later!' });
            }
          }
        });

      } else {
        res.status(401).json({ message: 'User do not exists' });
      }
    }
  });
});


// Method give a like to the actual dog
app.post('/api/pets/like/:username/:idpet', (req, res) => {

  const user = req.params.username
  const idPet = req.params.idpet
  const users = db.collection("users");

  users.find({ "user": user }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 1 && user && idPet) {

        users.updateOne(
          { "user": user },
          { $addToSet: { likePets: { $each: [idPet] } } }
        )

        res.status(200).json({ message: 'Like successfully' });
      } else {
        res.status(401).json({ message: 'Parameters are incorrect' });
      }
    }
  });
});


// Method give a dislike to the actual dog
app.post('/api/pets/dislike/:username/:idpet', (req, res) => {

  const user = req.params.username
  const idPet = req.params.idpet
  const users = db.collection("users");

  users.find({ "user": user }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 1 && user && idPet) {

        users.updateOne(
          { "user": user },
          { $addToSet: { dislikePets: { $each: [idPet] } } }
        )

        res.status(200).json({ message: 'Disike successfully' });
      } else {
        res.status(401).json({ message: 'Parameters are incorrect' });
      }
    }
  });
});