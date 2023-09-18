import logo from './logo.svg';
import './App.css';
import QuizData from './components/QuizData';

function App() {
  return (
    <div className='main'>
      <QuizData amount="3" category="10" type="multiple" difficulty="easy" />
    </div>
  );
}

export default App;
