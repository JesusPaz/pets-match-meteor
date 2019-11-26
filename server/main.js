import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import express from 'express';
import { read } from 'fs';

var store = require('store')
const app = express();
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


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
          dislikePets: [], usersMatch: []
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



// Method search if the user given also like your pet (If it's a match)
// user send: user that send a like
// user rcv: user that recv a like
app.get('/api/pets/match/:usersend/:userrcv', (req, res) => {

  const userSend = req.params.usersend
  const userRcv = req.params.userrcv

  const users = db.collection("users");
  const pets = db.collection("pets");

  users.find({ "user": userRcv }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 1 && userSend && userRcv) {
        var likePets = result[0].likePets;
        var isMatch = false
        var count = 0
        var findPet = likePets.some(async function (nextId) {
          let petOwner = await pets.findOne({ "_id": new ObjectID(nextId) })
          if (petOwner.owner == userSend) {
            isMatch = true
            res.status(200).json({ message: "It's a match" });

            users.updateOne(
              { "user": userRcv },
              { $addToSet: { usersMatch: { $each: [userSend] } } }
            )

            users.updateOne(
              { "user": userSend },
              { $addToSet: { usersMatch: { $each: [userRcv] } } }
            )
          }

          count++
          return petOwner.owner == userSend
        });
        if (!findPet) {
          res.status(200).json({ message: "It's not a match" });
        }
      } else {
        res.status(401).json({ message: 'Parameters are incorrect' });
        console.log("Bad data")
      }
    }
  });

});



// Method for get the pets that a user have register
// user: user that need to show his pets
app.get('/api/mypets/:user', (req, res) => {

  const userparam = req.params.user
  const pets = db.collection("pets");

  resta = [];

  pets.find({ "owner": userparam }).toArray(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      result.some(function (nextPet) {
        resta.push(nextPet);
      });

    }
    res.send(resta);
  });

});


// Method for get the pets that a user have register
// user: user that need to show his pets
app.get('/api/mylovers/:user', (req, res) => {

  const userparam = req.params.user

  const pets = [];

  const users = db.collection("users");
  const petsTotal = db.collection("pets");

  users.find({ "user": userparam }).toArray(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      result.some(function (nextUser) {
        var matches = nextUser.usersMatch;
        for (let i = 0; i < matches.length; i++) {
          petsTotal.find({ "owner": matches[i] }).toArray(function (err, result1) {
            if (err) {
              res.status(500).send(err);
            } else {
              result1.some(function (nextPet) {
                pets.push(nextPet);
              });
            }
            res.send(pets);
          });
        }
      });

    }

  });
});



// Method to sing up in the server. in the body rcv the user and password
app.post('/api/addpet', (req, res) => {

  const pet = req.body.pet

  const pets = db.collection("pets");

  pets.insertOne(pet, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(response);
    }
  });



});


app.post('/api/delete/:_id', (req, res) => {

  const userParam = req.params._id;
  const pets = db.collection("pets");

  pets.deleteOne({ "_id": ObjectID(userParam) }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200);
    }
  });

  res.status(200);

});

//load or create new chat if does not exist a previos chat conversation
app.post('/api/chat/:participantA/:participantB', async (req, res) => {
  const userA = req.params.participantA;
  const userB = req.params.participantB;
  const chats = db.collection("chats");

  let actChat = await chats.findOne({
    $or: [
      { $and: [{ participantA: userA }, { participantB: userB }] },
      { $and: [{ participantA: userB }, { participantB: userA }] }
    ]
  });
  // if the chat exists
  if (actChat != null) {
    res.status(200).send(actChat.messages);
  } else {

    var newChat = {
      "participantA": userA, "participantB": userB,
      messages: []
    };

    chats.insertOne(newChat, function (err, res) {
      if (err) throw err;
    });

    var messages = [];
    res.status(200).send(messages);
  }
});

// Add a new message to the conversation
app.post('/api/chat/addmsg/:participantA/:participantB/:msg', async (req, res) => {

  const userA = req.params.participantA;
  const userB = req.params.participantB;
  const msg = req.params.msg;
  const chats = db.collection("chats");

  let actChat = await chats.findOne({
    $or: [
      { $and: [{ participantA: userA }, { participantB: userB }] },
      { $and: [{ participantA: userB }, { participantB: userA }] }
    ]
  });
  // if the chat exists
  if (actChat != null) {

    chats.updateOne(
      {
        $or: [
          { $and: [{ participantA: userA }, { participantB: userB }] },
          { $and: [{ participantA: userB }, { participantB: userA }] }
        ]
      },
      { $addToSet: { messages: { $each: [msg] } } }
    )

    let actChat = await chats.findOne({
      $or: [
        { $and: [{ participantA: userA }, { participantB: userB }] },
        { $and: [{ participantA: userB }, { participantB: userA }] }
      ]
    });

    res.status(200).send(actChat.messages);


  } else {
    res.status(500).send("The chat do not exists");
  }
});


