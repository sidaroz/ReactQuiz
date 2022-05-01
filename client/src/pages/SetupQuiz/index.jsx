import React from 'react'
import {useState, useEffect} from 'react'
import './style.css'


function SetupQuiz() {

const [options, setOptions] = useState(null); //refers to the category options fetch
const [questionCategory, setQuestionCategory] = useState("");

//useEffect hook with fetch of the categories from the API endpoint
useEffect(()=> {
const apiUrl = 'https://opentdb.com/api_category.php'

fetch(apiUrl)
.then((res) => res.json())

.then((response) => {
  setOptions(response.trivia_categories)
})

},[setOptions])

const handleCategoryChoice = event => {
  setQuestionCategory(event.target.value) 
}

return (

<>
<main className='quiz-setup-container'>
<div>
          <h2>Select Category:</h2>
          <select value={questionCategory} onChange={handleCategoryChoice}>
    
            <option>All</option>

                {options && options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}

          </select>
        </div>



</main>


</>
)



}



export default SetupQuiz