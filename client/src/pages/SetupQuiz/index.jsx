import React from 'react'
import {useState, useEffect} from 'react'
import './style.css'


function SetupQuiz() {
const [userName, setUserName] = useState("");
const [options, setOptions] = useState(null); 
const [questionCategory, setQuestionCategory] = useState("");
const [questionDifficulty, setQuestionDifficulty] =  useState("");
const [numberOfQuestions, setNumberOfQuestions] = useState(0);
const [questionType, setQuestionType] = useState("");
const [loading, setLoading] = useState(false);

//useEffect hook with fetch of the categories from the API endpoint
useEffect(()=> {
const apiUrl = 'https://opentdb.com/api_category.php'

fetch(apiUrl)
.then((res) => res.json())

.then((response) => {
  setOptions(response.trivia_categories)
})

},[setOptions])


//functions to handle the events and update the state

const handleCategoryChoice = event => {
  setQuestionCategory(event.target.value) 
}

const handleDifficultyChange = event => {
  setQuestionDifficulty(event.target.value);
}

const handleNumberOfQuestions = event => {
  setNumberOfQuestions(event.target.value)
}

const handleTypeChange = event => {
  setQuestionType(event.target.value)
}

const addUserName = event => {
  setUserName(event.target.value)
}


// -----JSX Interface------

if (!loading){
return (

<>
<main className='quiz-setup-container'>
<h2>User name:</h2>
  <input type="text" onChange={addUserName} />


{/* ------Select Category DropDown------ */}

<div>
          <h2>Quiz Category:</h2>
          <select value={questionCategory} onChange={handleCategoryChoice}>
    
            <option>All</option>

                {options && options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}

          </select>
        </div>

{/* ------Select Difficulty Range Slider------ */}
        

<h2>Difficulty level:</h2>
<div className='range-slider-container'>
      <div className='slider-wraper'>
            <input type='range'  min='1' max='3'  className='slider'/>
            <span className='demo'> 0</span>
      </div>
</div>
{/* rembember the value='0' */}

{/* ------Select number of Questions------ */}

<div>
          <h2>Number o questions:</h2>

          <select value={numberOfQuestions} onChange={handleNumberOfQuestions}>
            <option value="1" key="amount-1">1</option>
            <option value="2" key="amount-2">2</option>
            <option value="3" key="amount-3">3</option>
            <option value="4" key="amount-4">4</option>  
            <option value="5" key="amount-5">5</option>  
            <option value="6" key="amount-6">6</option>  
            <option value="7" key="amount-7">7</option>  
            <option value="8" key="amount-8">8</option>  
            <option value="9" key="amount-9">9</option>  
            <option value="10" key="amount-10">10</option>  
          </select>
</div>

{/* ------Select Type of question------ */}


<div>
      <h2>Select Question Type:</h2>

          <select value={questionType} onChange={handleTypeChange}>

            <option value="" key="type-0">All</option>
            <option value="multiple" key="type-1">Multiple Choice</option>
            <option value="boolean" key="type-2">True/False</option>

          </select>
</div>
{/* ------Buttons Section------ */}


<div className='setquiz-buttons'>
<button>Start Quiz</button> <br/>
<button>Start multiple players Quiz</button>
</div>


</main>

</>
)

} else {
  <p>LOADING....</p>
}


}



export default SetupQuiz