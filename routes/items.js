const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const app = express();


app.post('/',(req, res) => {
  const userInput = req.body.userInput
  res.json({ success: true, message: 'Input received', data: userInput });
});
