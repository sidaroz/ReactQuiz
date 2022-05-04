import React from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
const navigate = useNavigate();


  return (
   <>
   <h1 className='home-title'>Zoomies</h1>
   <div className='btn-grid'>
<button  className='btn-home' onClick={() => navigate("/setupquiz")}>Start a quiz</button>
<button className='btn-home'> Leaderboards</button>

   </div>
   </> 
  )
}

export default Home