import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FetchButton from "../../components/FetchButton/Index";

function QuizCompleted() {
  const username = useSelector((state) => state.options.username);
  let score = useSelector((state) => state.score);
  const questions = useSelector((state) => state.questions);
  const navigate = useNavigate();

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
        mode: "no-cors",
      };
      const resp = await fetch(
        "https://hookb.in/mZGZPe8ndjILnrqM8M0L",
        options
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    submitScore();
    console.log("called on right page mate");
  }, []);

  return (
    <>
      <h1 className="score-title">
        {username} your score was: {score}
      </h1>
      <FetchButton />
      <button className="btn-home" onClick={() => navigate("/leaderboards")}>
        {" "}
        Leaderboards
      </button>
    </>
  );
}

export default QuizCompleted;
