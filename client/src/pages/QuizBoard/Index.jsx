import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css'
import { Axios } from 'axios'

const QuizBoard = () => {

  const urlApi = 'https://opentdb.com/api.php?amount=10';
  const [questions,setQuestions]= useState([]);
  const [currentIndex,setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(urlApi)
    .then(res => res.data)
    .then(data => {setQuestions(data.results)})
   console.log(questions)
  },[])


  return (
<>

<div className='quizboard-container'>

  <div className='question'> This is a question:</div>

  <div>
    <button>Question1</button>
    <button>Question2</button>
    <button>Question3</button>
    <button>Question4</button>
  </div>



</div>


</>
)
}

export default QuizBoard