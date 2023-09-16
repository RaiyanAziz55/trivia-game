import logo from './logo.svg';
import './App.css';
import QuizData from './components/quizData';

function App() {
  return (
    <body>
      <QuizData amount="3" category="10" type="boolean" difficulty="easy"/>
    </body>
  );
}

export default App;
