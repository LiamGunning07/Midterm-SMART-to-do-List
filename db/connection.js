// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

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
