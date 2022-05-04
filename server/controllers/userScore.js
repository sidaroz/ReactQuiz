const UserScore = require('../models/userScore');

const newQuiz = async (req,res) => {
  try {
   console.log('new quiz function called')
   const score = await UserScore.newQuiz(req.body);
   console.log(score);
  } catch (err) {
    res.status(500).json({ msg: "Quiz could not be created!" });
  };
};

const findByUsername = async (req,res) => {
  try {
    console.log('filter by username function called')
    const score = await UserScore.findByUsername(req.params);
    res.status(200).send(score);
   } catch (err) {
     res.status(500).json({ msg: "Quiz could not be found!" });
   };
 };

const updateScore = async (req,res) => {
  try {
    const score = await UserScore.updateScore(req.params.id);
    console.log(result)
    res.status(200).send(score);
   } catch (err) {
     res.status(500).json({ msg: "Quiz could not be updated!" });
   };
 };

 module.exports = {
  newQuiz,
  findByUsername,
  updateScore,
};
