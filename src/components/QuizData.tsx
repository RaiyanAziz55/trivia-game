import React, { useEffect, useState, FC, MouseEvent } from 'react';
import FetchData from '../api/FetchData';
import Multiple from './Multiple';
import "../App.css"

interface QuizDataProps {  //Framing out the prop structure
  amount: number;
  category: string;
  type: string;
  difficulty: string;
  menu: (menuValue: boolean) => void; 
  
}

const QuizData: FC<QuizDataProps> = (props) => {
  const { amount, category, type, difficulty } = props;

  const [data, setData] = useState<any[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<any>({});
  const [choices, setChoices] = useState<string[]>([]);
  const [doneQuiz, setDoneQuiz] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(2);
  const [fail, setFail] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const setInitialValues = (fetchData: any) => { // Sets initial values by using setters and parsing them
    setData(fetchData);
    setCurrentQuestionSet(fetchData[0]);
    const incorrectAnswers = JSON.parse(JSON.stringify(fetchData[0].incorrect_answers));
    setChoices([fetchData[0].correct_answer.replaceAll('"', ''), ...incorrectAnswers]);
  }

  useEffect(() => { // Use effect that is reliant on the 4 main user inputs and fetches all the data
    const getData = async ():Promise<void> => {
      try {
        const fetchedData = await FetchData(amount, category, type, difficulty);
        console.log(fetchedData);
        setInitialValues(fetchedData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [amount, category, type, difficulty]);

  const updateChoices = (index: number): void => {
    const incorrectAnswers = JSON.parse(JSON.stringify(data[index].incorrect_answers));
    setChoices([data[index].correct_answer.replaceAll('"', ''), ...incorrectAnswers]);
  }

  const changeQuestion = ():void => {
    if (questionIndex + 1 < data.length && lives > -1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestionSet(data[questionIndex + 1]);
      updateChoices(questionIndex + 1);
    }
    else{
      if (lives > -1){
        setDoneQuiz(true);
        setLives(2);
      }
    }
  };

  const formatQuestion = (): string => { // Formats question by replacing unwanted characters
    if (!currentQuestionSet.question) {
      return 'Loading...';
    }
    const q = currentQuestionSet.question.replaceAll('&#039;', '\'').replaceAll('&quot;', '"');
    return q;
  }

  const handleHome = (e: MouseEvent<HTMLButtonElement>): void => {
    props.menu(true);
  }

  const handleLives = (): void => {
    if (lives === 0){
      setFail(true);
    }
    else{
      setLives(lives-1);
    }
    
  }

  return (

    <div className='container'>
      <div className='info'>
        <h4>Question {questionIndex} out of {data.length}</h4> {/* This will show miscellaneous information*/}
        <h4>Lives: {lives} left</h4>
        <h4>Category: {currentQuestionSet.category}</h4>
      </div>
  {doneQuiz ? ( // checks if the user is done the quiz
    <>
    <div className='congrat-display load-in'>
      <h2>Congratulations! You beat the quiz! </h2>
      <h4>Score: {Math.round((score/data.length)*100)} %</h4>
      </div>
      <button onClick={handleHome} className="home-button">Home</button>
    </>
  ) : fail ? ( // if they are not done, did the user fail, if not, then move onto the next question
    <>
    <div className='fail-display load-in'>
      <h2>Game Over! You lost all your lives!</h2>
      </div>
      <button onClick={handleHome} className='home-button'>Home</button>
    </>
  ) : (
    <>
    <div className='question'>
      <h1 >{formatQuestion()}</h1>
      </div>
    {/* Component to show the choices*/}
      <Multiple choices={choices} next={changeQuestion} correct={currentQuestionSet.correct_answer} lives={handleLives} setScore={setScore} score={score}/>
    </>
  )}
</div>


  );
  
};

export default QuizData;
