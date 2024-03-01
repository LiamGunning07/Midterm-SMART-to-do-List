const express = require('express');
const router  = express.Router();
const db = require('../db/connection.js');



router.post('/',(req, res) => {
  const userInput = req.body.userInput
  res.json({ success: true, message: 'Input received', data: userInput });
});

router.get('/items/:category', async (req, res) => {
  console.log("in items.js");
  console.log("db =", db)
  console.log("req =", req.params.category)
  const category = req.params.category;
  try {
    const items = await db.getAllForCategory(category);
    console.log("items =", items)
    return res.json(items); // Assuming you want to render JSON data, adjust as needed

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
