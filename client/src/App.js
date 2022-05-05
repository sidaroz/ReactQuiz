
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/index'
import NavBar from './components/NavBar/Index';
import SetupQuiz from './pages/SetupQuiz';
import QuizBoard from './pages/QuizBoard/Index';
import './App.css';

function App() {
  return (
<>
<NavBar role='NavBar' />
<main>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setupquiz" element={<SetupQuiz />} />
        <Route path="/quizboard" element={<QuizBoard />} />
    </Routes>
</main>
      
</>
);
}

export default App;
