// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const getAllForCategory = function(category) {
  if (category === null) {
    category === misc;
  }
  return db
    .query(`SELECT * FROM to_do_items WHERE category = $1`, [category])
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log(err.message)
    });
}

const addToDo = function(values) {
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

const db = new Pool(dbParams);
db.connect();
module.exports = db;
// functions that use querys to leverage db info
// export all query functions
// in routs require db/connection.js


//router.get("/properties", (req, res) => {
//   database
//     .getAllProperties(req.query, 20)
//     .then((properties) => res.send({ properties }))
//     .catch((e) => {
//       console.error(e);
//       res.send(e);
//     });
// });
