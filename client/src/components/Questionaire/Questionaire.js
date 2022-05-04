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
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  let username = useSelector((state) => state.options.username);
  let score = useSelector((state) => state.score);
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

  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft === 0) {
      setAnswerSelected(true);
      setSelectedAnswer(undefined);
      setTimeout(() => {
        setAnswerSelected(false);
        setShowAnswers(false);
        setTimeLeft(5);
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

  async function submitScore() {
    let userDetails = {
      thisUsername: username,
      thisScore: score,
    };
    console.log(userDetails);
    try {
      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      };
      const resp = await fetch("https://hookb.in/mZGZPe8ndjILnrqM8M0L");
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
      // Submits score and username when game is finished
      if (questionIndex + 1 === questions.length) {
        submitScore();
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
    return (
      <h1>
        {username} your score was: {score}
      </h1>
    );
  }
  return (
    <div className="question-grid">
      <div className="question-header">
        <p>
          Question: {questionIndex + 1} / {questions.length}
        </p>
        <h2>{question.question}</h2>
        <h2>{timeLeft}</h2>
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
