import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchButton from "../../components/FetchButton/Index";
import "./style.css";

function SetupQuiz() {
  // const userName = useSelector(state => state.option);
  const [options, setOptions] = useState(null);
  const loading = useSelector((state) => state.options.loading);
  const questionCategory = useSelector(
    (state) => state.options.question_category
  );
  const numberOfQuestions = useSelector(
    (state) => state.options.amount_of_questions
  );
  const questionType = useSelector((state) => state.options.question_type);
  const rangeSlider = document.querySelector(".slider");

  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = "https://opentdb.com/api_category.php";

    const handleLoadingChange = (value) => {
      dispatch({
        type: "CHANGED_LOADING",
        loading: value,
      });
    };
    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())

      .then((response) => {
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

  //functions to handle the events and update the state
  const handleUserNameChoice = (event) => {
    const lowerUsername = event.target.value.toLowerCase();

    const fixedUsername = lowerUsername.replace(
      lowerUsername[0],
      lowerUsername[0].toUpperCase()
    );
    dispatch({
      type: "CHANGED_USERNAME",
      username: fixedUsername,
    });
  };

  const handleCategoryChoice = (event) => {
    dispatch({
      type: "CHANGED_CATEGORY",
      question_category: event.target.value,
    });
  };

  const handleDifficultyChange = (event) => {
    let difficulty;
    if (event.target.value === "1") {
      difficulty = "easy";
    } else if (event.target.value === "2") {
      difficulty = "medium";
    } else if (event.target.value === "3") {
      difficulty = "hard";
    }
    dispatch({
      type: "CHANGED_DIFFICULTY",
      question_difficulty: difficulty,
    });
  };

  const handleNumberOfQuestions = (event) => {
    dispatch({
      type: "CHANGED_NUMBER",
      amount_of_questions: event.target.value,
    });
  };

  const handleTypeChange = (event) => {
    dispatch({
      type: "CHANGED_TYPE",
      question_type: event.target.value,
    });
  };

  function getSliderValue(e) {
    const rangeValue = document.querySelector(".slider").value;
    const sliderTitle = document.querySelector(".demo");
    if (rangeValue === "1") {
      sliderTitle.textContent = "Easy";
      sliderTitle.classList.add("easy");
      sliderTitle.classList.remove("medium");
      sliderTitle.classList.remove("hard");
    } else if (rangeValue === "2") {
      sliderTitle.textContent = "Medium";
      sliderTitle.classList.add("medium");
      sliderTitle.classList.remove("hard");
    } else if (rangeValue === "3") {
      sliderTitle.textContent = "Hard";
      sliderTitle.classList.add("hard");
    }
    handleDifficultyChange(e);
  }
  // --------------------end of action producers------------------

  if (!loading) {
    return (
      <div className="main-container">
        <div>
          <h2 className="username-input">Username:</h2>
          <input
            className="input-for-user"
            type="text"
            onChange={handleUserNameChoice}
            required
          />
        </div>

        {/* ------Select Category DropDown------ */}

        <div>
          <h2>Quiz Category:</h2>
          <select
            className="category"
            value={questionCategory}
            onChange={handleCategoryChoice}
          >
            <option>All</option>

            {options &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>

        {/* ------Select Difficulty Range Slider------ */}

        <div className="range-slider-container">
          <h2>Difficulty level:</h2>
          <span className="demo">Easy</span>
          <div className="slider-wraper">
            <input
              type="range"
              defaultValue="1"
              step="1"
              list="marks"
              className="slider"
              min="1"
              max="3"
              onChange={getSliderValue}
            />
            <datalist id="marks">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
            </datalist>
          </div>
        </div>
        {/* rembember the value='0' */}

        {/* ------Select number of Questions------ */}

        <div>
          <h2>Number of questions:</h2>

          <select
            className="amount-questions"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestions}
          >
            <option value="1" key="amount-1">
              1
            </option>
            <option value="2" key="amount-2">
              2
            </option>
            <option value="3" key="amount-3">
              3
            </option>
            <option value="4" key="amount-4">
              4
            </option>
            <option value="5" key="amount-5">
              5
            </option>
            <option value="6" key="amount-6">
              6
            </option>
            <option value="7" key="amount-7">
              7
            </option>
            <option value="8" key="amount-8">
              8
            </option>
            <option value="9" key="amount-9">
              9
            </option>
            <option value="10" key="amount-10">
              10
            </option>
          </select>
        </div>

        {/* ------Select Type of question------ */}

        <div>
          <h2>Select Question Type:</h2>

          <select
            value={questionType}
            onChange={handleTypeChange}
            className="question-type"
          >
            <option value="" key="type-0">
              All
            </option>
            <option value="multiple" key="type-1">
              Multiple Choice
            </option>
            <option value="boolean" key="type-2">
              True/False
            </option>
          </select>
        </div>
        {/* ------Buttons Section------ */}

        <div className="setquiz-buttons">
          <FetchButton />
        </div>
      </div>
    );
  }
  return <p>LOADING....</p>;
}

export default SetupQuiz;
