// PG database client/connection setup
const { Pool } = require('pg');

const client = new Pool ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

client.connect();

const getAllForCategory = function(category) {
  return client
    .query(`SELECT * FROM to_do_items WHERE category = $1`, [category])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("This is error")
      console.log(err.message)
    });
}

const addToDoItem = function(values) {
  let category = values.category;
  console.log(category);
  if (category !== 'to_watch' && category !== 'to_eat' && category !== 'to_read' && category !== 'to_buy') {
    console.log("category changed to misc")
    category = 'misc';
  }
  return client
    .query(`INSERT INTO to_do_items (user_id, title, category)
            VALUES ($1, $2, $3)
            RETURNING *`, [values.user_id, values.title, category])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error to propagate it
    })
}

const getCategoryForId = function(itemId) {
  return client
    .query(`SELECT category FROM to_do_items WHERE id = ${itemId}`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error to propagate it
    })
}

const deleteItem = function(itemId) {
  return client
    .query(`DELETE FROM to_do_items WHERE id = ${itemId}`)
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error to propagate it
    })
}

module.exports = { getAllForCategory, addToDoItem, deleteItem, getCategoryForId };
