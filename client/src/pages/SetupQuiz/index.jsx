import React from 'react'
import {useState, useEffect} from 'react'
import './style.css'


function SetupQuiz() {

//useState hook


const [options, setOptions] = useState(null); //refers to the category options fetch

//useEffect hook with fetch of the categories from the API endpoint
useEffect(()=> {
const apiUrl = 'https://opentdb.com/api_category.php'

fetch(apiUrl)
.then((res) => res.json())

.then((response) => {
  setOptions(response.trivia_categories)
})

},[setOptions])



return (

<>
</>
)



}



export default SetupQuiz