import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import NavBar from "./components/NavBar/Index";
import SetupQuiz from "./pages/SetupQuiz";
import QuizBoard from "./pages/QuizBoard/Index";
import "./App.css";
import QuizCompleted from "./pages/QuizCompleted";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setupquiz" element={<SetupQuiz />} />
          <Route path="/quizboard" element={<QuizBoard />} />
          <Route path="/quizcomplete" element={<QuizCompleted />} />
          <Route path="/leaderboards" element={<Leaderboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
