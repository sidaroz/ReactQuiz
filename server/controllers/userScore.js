const UserScore = require("../models/userScore");

const getAllScore = async (req, res) => {
  try {
    const users = await UserScore.all;
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ msg: "Could not get scores" });
  }
};

const newQuiz = async (req, res) => {
  try {
    const score = await UserScore.newQuiz(req.body);
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ msg: "Quiz could not be created!" });
  }
};

const findByUsername = async (req, res) => {
  try {
    const score = await UserScore.findByUsername(req.params);
    res.status(200).send(score);
  } catch (err) {
    res.status(500).json({ msg: "Quiz could not be found!" });
  }
};

const updateScore = async (req, res) => {
  try {
    const updatedUser = await UserScore.updateScore(req.body);
    console.log("reach here");
    console.log(updatedUser);
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Quiz could not be updated!" });
  }
};

module.exports = {
  getAllScore,
  newQuiz,
  findByUsername,
  updateScore,
};
