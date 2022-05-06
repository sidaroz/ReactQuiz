import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function resetQuiz() {
    navigate("/setupquiz");
    dispatch({
      type: "NEW_QUIZ",
    });
  }
  return (
    <>
      <h1 className="home-title">Zoomies</h1>
      <div className="btn-grid">
        <button className="btn-home" onClick={resetQuiz}>
          Start a quiz
        </button>
        <button className="btn-home" onClick={() => navigate("/leaderboards")}>
          {" "}
          Leaderboards
        </button>
      </div>
    </>
  );
}

export default Home;
