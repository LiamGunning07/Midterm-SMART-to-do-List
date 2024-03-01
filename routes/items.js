const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const app = express();


router.post('/',(req, res) => {
  const userInput = req.body.userInput
  res.json({ success: true, message: 'Input received', data: userInput });
});

app.get('/items/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const items = await db.getAllForCategory(category);
    res.json(items); // Assuming you want to render JSON data, adjust as needed
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
