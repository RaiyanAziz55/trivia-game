import logo from './logo.svg';
import './App.css';
import QuizData from './components/quizData';

function App() {
  return (
    <div>
      <QuizData amount="3" category="10" type="boolean" difficulty="easy"/>
    </div>
  );
}

export default App;
