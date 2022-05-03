import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Questionaire.css";
const decodeHTML = function (html) {
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
};

function Questionaire() {
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(20);

  const username = useSelector((state) => state.options.username);
  const score = useSelector((state) => state.score);
  const encodedQuestions = useSelector((state) => state.questions);
  const questionIndex = useSelector((state) => state.index);

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });

    setQuestions(decodedQuestions);
  }, [encodedQuestions]);
  const dispatch = useDispatch();
  const question = questions[questionIndex];
  const correctAnswer = question && question.correct_answer;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );

    setOptions(answers);
  }, [question]);

  const handleAnswer = (e) => {
    setAnswerSelected(true);
    setTimer(20);
    setSelectedAnswer(e.target.textContent);
    if (e.target.textContent === correctAnswer) {
      dispatch({
        type: "SET_SCORE",
        score: score + 1,
      });
    }
    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);
        dispatch({
          type: "SET_INDEX",
          index: questionIndex + 1,
        });
      }, 1500);
    }
  };

  const getClass = (option) => {
    if (!answerSelected) {
      return "";
    }
    if (option === correctAnswer) {
      return "correct";
    }
    if (selectedAnswer !== correctAnswer) {
      return "selected";
    }
  };

  if (!question) {
    return (
      <h1>
        {username} your score was: {score}
      </h1>
    );
  }
  return (
    <div className="question-grid">
      <div className="question-header">
        <p>Question: {questionIndex + 1}</p>
        <h2>{question.question}</h2>
        <h3>{timer}</h3>
      </div>
      <div className="answer-btn-grid">
        {options.map((answer, i) => (
          <button key={i} onClick={handleAnswer} className={getClass(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questionaire;
