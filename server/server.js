const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());

const usersRoutes = require("./routes/userRoutes");
server.use("/users", usersRoutes);

server.get("/", (req, res) => res.send("Welcome to our quiz"));

module.exports = server;

// const server = express();
// server.use(cors());
// server.use(express.json());
// const usersRoutes = require('./routes/userRoutes')

// server.use('/Score', usersRoutes);

// server.get("/", (req, res) => res.send({ message: "Welcome to our quiz" }));

// module.exports = server;
