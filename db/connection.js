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
  console.log(category, "category should be here");
  if (category === null) {
    category = 'misc';
  }
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
  if (!category) {
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

module.exports = { getAllForCategory, addToDoItem };
