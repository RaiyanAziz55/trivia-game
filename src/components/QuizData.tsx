import React, { useEffect, useState, FC, MouseEvent } from 'react';
import FetchData from '../api/FetchData';
import Multiple from './Multiple';
import './css/quizData.css';

interface QuizDataProps {
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
  const [lives, setLives] = useState<number>(1);
  const [fail, setFail] = useState<boolean>(false);

  const setInitialValues = (fetchData: any) => {
    setData(fetchData);
    setCurrentQuestionSet(fetchData[0]);
    const incorrectAnswers = JSON.parse(JSON.stringify(fetchData[0].incorrect_answers));
    setChoices([fetchData[0].correct_answer.replaceAll('"', ''), ...incorrectAnswers]);
  }

  useEffect(() => {
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
    if (questionIndex + 1 < data.length && lives > 0) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestionSet(data[questionIndex + 1]);
      updateChoices(questionIndex + 1);
    }
    else{
      if (lives === 0){
        setFail(true);
      }
      else{
        setDoneQuiz(true);
      }
     
    }
  };

  const formatQuestion = (): string => {
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
    setLives(lives-1);
  }

  return (

    <div className='container'>
      <div className='info'>
        <h3>Info</h3>
        <h4>Question {questionIndex} out of {data.length}</h4>
        <h4>Lives: {lives} left</h4>
        <h4>Category: {currentQuestionSet.category}</h4>
      </div>
  {doneQuiz ? (
    <>
    <div className='congrat-display'>
      <h2>Congratulations! You won </h2>
      </div>
      <button onClick={handleHome} className="home-button">Home</button>
    </>
  ) : fail ? (
    <>
    <div className='fail-display'>
      <h2>you Failed</h2>
      </div>
      <button onClick={handleHome} className='home-button'>Home</button>
    </>
  ) : (
    <>
    <div className='question'>
      <h1 >{formatQuestion()}</h1>
      </div>
  
      <Multiple choices={choices} next={changeQuestion} correct={currentQuestionSet.correct_answer} lives={handleLives} />
    </>
  )}
</div>


  );
  
};

export default QuizData;
