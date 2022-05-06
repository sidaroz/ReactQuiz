import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Questionaire.css";
import { useNavigate } from "react-router-dom";

const decodeHTML = function (html) {
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
};

function Questionaire() {
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

  let score = useSelector((state) => state.score);
  const encodedQuestions = useSelector((state) => state.questions);
  const questionIndex = useSelector((state) => state.index);

  // This useEffect decodes the questions and answers in readable format.
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

  // This useEffect sorts out the timer for each question.
  const [timeLeft, setTimeLeft] = useState(100);
  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft === 0) {
      setAnswerSelected(true);
      setSelectedAnswer(undefined);
      setTimeout(() => {
        setAnswerSelected(false);
        setShowAnswers(false);
        setTimeLeft(100);
        dispatch({
          type: "SET_INDEX",
          index: questionIndex + 1,
        });
      }, 900);
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  // This sets up the question answers and sorts them in a random order.
  useEffect(() => {
    if (!question) {
      return;
    }
    if (question.incorrect_answers.length === 1) {
      const trueAnswers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];
      trueAnswers.sort(() => (Math.random() > 0.5 ? 1 : -1));
      setAnswerOptions(trueAnswers);
    } else {
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );

      setAnswerOptions(answers);
    }
  }, [question]);

  // Function for clicking each button and sending data to store.
  const handleAnswer = (e) => {
    if (!showAnswers) {
      setAnswerSelected(true);
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
          setShowAnswers(false);
          setTimeLeft(5);
          dispatch({
            type: "SET_INDEX",
            index: questionIndex + 1,
          });
        }, 1500);
      }
    }

    setShowAnswers(true);
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
    if (selectedAnswer === undefined) {
      return "";
    }
  };

  if (!question) {
    return navigate("/quizcomplete");
  }
  return (
    <div className="question-grid">
      <div className="question-header">
        <p>
          Question: {questionIndex + 1} / {questions.length}
        </p>
        <h2 className="question">{question.question}</h2>
        <div className="background-timer">
          <h2 className="timer ">{timeLeft}</h2>
        </div>
      </div>
      <div className="answer-btn-grid">
        {answerOptions.map((answer, i) => (
          <button key={i} onClick={handleAnswer} className={getClass(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questionaire;
