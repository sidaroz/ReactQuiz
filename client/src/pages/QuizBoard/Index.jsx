import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './style.css';


const QuizBoard = () => {

const score = useSelector(state => state.score);
const questions = useSelector(state => state.questions);
const questionIndex = useSelector(state => state.index)

const dispatch = useDispatch();

const question = questions[questionIndex];
const answer = question && question.correct_answer;

const [options, setOptions] = useState([]); 

const[answerSelected, setAnswerSelected] = useState(false);
const [answerCorrect, setAnswerCorrect] = useState(null);




const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

useEffect(() => {
  if (!question) {
    return;
  }
  let answers = [...question.incorrect_answers]
  answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)
  setOptions(answers)
}, [question])


const handleChoice = event => {
    
  setAnswerSelected(true);
  setAnswerSelected(event.target.textContent)


    if (event.target.textContent === answer){
    dispatch({
    type:'SET_SCORE',
    score: score + 1,
    })
    
    if (questionIndex + 1 <= question.length){
    setTimeout(() => {
    setAnswerSelected(false);
    }, 2500)

    }
}

}; 

return (
<>
<div className='quizboard-container'>

  <div className='questionNumber'> Question: {questionIndex + 1}</div>
  <h1>{questions.question}</h1>

  <ul>
  
  {options.map((option, i) => (  <li key={i} onClick={handleChoice}> {option}</li> ) )}

  </ul>
  <div>

  Score: {score} / {questions.length}
  </div>

</div>
</>
)
}

export default QuizBoard