const express = require ('express')
const server = express.Router();

const routes = require("./routes")

// const userRoutes = require("./routes/usersRoutes");
// const habitRoutes = require("./routes/habitRoutes");

// server.use("/users", userRoutes);
// server.use("/habits", habitRoutes);

server.get("/", (req, res) => res.json({ message: "Welcome" }));

module.exports = server;
