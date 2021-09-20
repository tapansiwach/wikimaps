-- Drop widgets table from boilerplate
DROP TABLE IF EXISTS widgets CASCADE;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_pic_url VARCHAR(255) NOT NULL
);
