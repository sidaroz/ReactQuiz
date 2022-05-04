const express = require("express");
const router = express.Router();
const userScoreController = require("../controllers/userScore");

router.post("/", userScoreController.newQuiz);
router.get("/:usename", userScoreController.findByUsername);
router.patch("/entry/:id", userScoreController.updateScore)

module.exports = router;
