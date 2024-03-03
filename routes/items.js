const express = require('express');
const router  = express.Router();
const db      = require('../db/connection.js');


// posting new to-do item, this is where we will implement api and pass into data
router.post('/add', async (req, res) => {
  const userId = 1;
  const newItem = {};
  newItem.title = req.body.userInput;
  newItem.user_id = userId;
  newItem.category = 'to_eat'
  db
    .addToDoItem(newItem)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

// Loads tables from db
router.get('/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const items = await db.getAllForCategory(category);
    return res.json(items);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
