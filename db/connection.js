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
  return db
    .query(`INSERT INTO to_do_items (title, category)
            VALUES ($1, $2)
            RETURNING *`, [values.title, values.category])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message)
    })
}

module.exports = { getAllForCategory, addToDoItem };
