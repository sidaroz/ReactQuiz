DROP TABLE IF EXISTS userscores;

CREATE TABLE userscores (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    score int NOT NULL,
    frequency int NOT NULL
);

INSERT INTO userscores (username, score, frequency) VALUES ('sidar', 2, 7) RETURNING *;
