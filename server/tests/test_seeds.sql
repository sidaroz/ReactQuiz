TRUNCATE userScore RESTART IDENTITY;

INSERT INTO userScore (id, username, score, frequency) VALUES
(111, 'user1', 11, 1),
(222, 'user2', 22, 2);
(333, 'user3', 33, 3),
(444, 'user4', 44, 4);

