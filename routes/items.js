const express = require('express');
const router  = express.Router();
const db      = require('../db/connection.js');
const OpenAI  = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/add', async (req, res) => {
  const userId = 1;
  const newItem = {};
  newItem.title = req.body.userInput;
  newItem.user_id = userId;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Please give a 1 word answer that best describes this word: ${req.body.userInput}. Choose your 1 word from the following 5 words : to_eat, to_watch, to_buy, to_watch, misc. If you think it is a movie or show, please respond with to_watch, if you think it is a book please resond with to_read, if you think it is a food, please respond with to_eat, if you think it is a product, please resond with to_buy, if you are not sure about the item, please respond with misc.`}],
    max_tokens: 10,
  })
  console.log("openAi's messgae: ", response.choices[0].message.content)
  newItem.category = response.choices[0].message.content
  db
    .addToDoItem(newItem)
    .then((item) => {
      const responseObj = {
        category: newItem.category,
        item: item
      }
      res.send(responseObj);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.post('/newCategory', async (req, res) => {
  console.log("Selected New Category");
  const id = req.body.id;
  const cat = req.body.category
  const values = { id: id, category: cat };
  try {
    await db.changeCategory(values);
    res.send(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post('/completed', async (req, res) => {
  console.log("In post route");
  const id = req.body.id;
  try {
    await db.completeItem(id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post('/delete', async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const category = await db.getCategoryForId(id);
    await db.deleteItem(id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
