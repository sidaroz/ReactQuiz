DROP TABLE IF EXISTS userScore;

CREATE TABLE userScore (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    score varchar NOT NULL,
    frequency varchar NOT NULL.
);

