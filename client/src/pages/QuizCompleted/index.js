import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FetchButton from "../../components/FetchButton/Index";

function QuizCompleted() {
  const username = useSelector((state) => state.options.username);
  let score = useSelector((state) => state.score);
  const questions = useSelector((state) => state.questions);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Submits the score when it is called.
  async function submitScore() {
    let userDetails = {
      username: username,
      score: score,
      frequency: questions.length,
    };
    console.log(userDetails);
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      };
      const resp = await fetch("http://localhost:3005/users", options);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    submitScore();
  }, []);

  function resetQuiz() {
    navigate("/setupquiz");
    dispatch({
      type: "NEW_QUIZ",
    });
  }

  return (
    <>
      <h1 className="score-title">
        {username} your score was: {score}
      </h1>
      <button className="btn-home" onClick={resetQuiz}>
        Start a new quiz
      </button>
      <button className="btn-home" onClick={() => navigate("/leaderboards")}>
        {" "}
        Leaderboards
      </button>
    </>
  );
}

export default QuizCompleted;
