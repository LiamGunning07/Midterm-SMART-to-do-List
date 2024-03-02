const express = require('express');
const router  = express.Router();
const db      = require('../db/connection.js');


// posting new to-do item, this is where we will implement api and pass into data
router.post('/items', async (req, res) => {
  console.log("In post route");
  console.log("req.data =", req.data);
  console.log("req.body =", req.body);
  console.log("req.body.data =", req.body.data);
  console.log("req.body.userInput =", req.body.userInput);
  const userInput = req.body.userInput
  res.json({ success: true, message: 'Input received', data: userInput });
});

// Loads tables from db
router.get('/items/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const items = await db.getAllForCategory(category);
    return res.json(items);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
