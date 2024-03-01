-- Drops and Recreates Table

CREATE TABLE to_do_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);
