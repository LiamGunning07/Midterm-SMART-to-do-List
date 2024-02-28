-- Drops and Recreates Table

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE to_do_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFRENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE 
);