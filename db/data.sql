DROP TABLE IF EXISTS userscores;

CREATE TABLE userscores (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    score int NOT NULL,
    frequency int NOT NULL
);

INSERT INTO userscores (username, score, frequency) VALUES ('Sidar', 9, 15), ('Mel', 13, 15), ('Luiz', 20, 28), ('Evie', 14, 19), ('Sergi', 9, 10), ('Emile', 16, 25), ('Jagan', 25, 30) RETURNING *;
