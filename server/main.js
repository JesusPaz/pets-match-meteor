import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from Express!!!'});
});

WebApp.connectHandlers.use(app);