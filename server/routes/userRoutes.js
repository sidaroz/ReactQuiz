const express = require("express");
const router = express.Router();
const userScoreController = require("../controllers/userScore");

// getting all
router.get("/", userScoreController.getAllScore);

// creating one
router.post("/", userScoreController.newQuiz);

// getting one
router.get("/:username", userScoreController.findByUsername);

// updating one
router.patch("/:username", userScoreController.updateScore);

module.exports = router;
