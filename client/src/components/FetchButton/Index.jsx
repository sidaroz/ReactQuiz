import React from "react";
import { useSelector, useDispatch } from "react-redux";

function FetchButton(props) {
  const questionCategory = useSelector(
    (state) => state.options.question_category
  );
  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  );
  const numberOfQuestions = useSelector(
    (state) => state.options.amount_of_questions
  );
  const questionType = useSelector((state) => state.options.question_type);
  const dispatch = useDispatch();
  const setLoading = (value) => {
    dispatch({
      type: "CHANGE_LOADING",
      loading: value,
    });
  };
  const setQuestions = (value) => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: value,
    });
  };

  const handleQuery = async () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;

    if (questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`);
    }
    if (questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
    }
    if (questionType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`);
    }

    setLoading(true);
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        // this is where we will set questions in the state using an action
      });
  };

  return <button onClick={handleQuery}>Start Quiz</button>;
}

export default FetchButton;
