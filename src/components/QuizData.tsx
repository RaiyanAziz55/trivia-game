import React, { useEffect, useState, FC } from 'react';
import FetchData from '../api/FetchData';
import Boolean from './Boolean';
import Multiple from './Multiple';
import './css/quizData.css';

interface QuizDataProps {
  amount: number;
  category: string;
  type: string;
  difficulty: string;
}

const QuizData: FC<QuizDataProps> = (props) => {
  const { amount, category, type, difficulty } = props;

  const [data, setData] = useState<any[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<any>({});
  const [choices, setChoices] = useState<string[]>([]);

  const setInitialValues = (fetchData: any) => {
    setData(fetchData);
    setCurrentQuestionSet(fetchData[0]);
    const incorrectAnswers = JSON.parse(JSON.stringify(fetchData[0].incorrect_answers));
    setChoices([fetchData[0].correct_answer.replaceAll('"', ''), ...incorrectAnswers]);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await FetchData(amount, category, type, difficulty);
        console.log(fetchedData);
        setInitialValues(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [amount, category, type, difficulty]);

  const updateChoices = (index: number) => {
    const incorrectAnswers = JSON.parse(JSON.stringify(data[index].incorrect_answers));
    setChoices([data[index].correct_answer.replaceAll('"', ''), ...incorrectAnswers]);
  }

  const changeQuestion = () => {
    if (questionIndex + 1 < data.length) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestionSet(data[questionIndex + 1]);
      updateChoices(questionIndex + 1);
    }
  };

  const formatQuestion = () => {
    if (!currentQuestionSet.question) {
      return 'Loading...';
    }
    const q = currentQuestionSet.question.replaceAll('&#039;', '\'').replaceAll('&quot;', '"');
    return q;
  }

  return (
    <div className='question-container'>
      <h1 className='question'>{formatQuestion()}</h1>
      {type === 'boolean' ? 
        <Boolean next={changeQuestion} correct={currentQuestionSet.correct_answer} /> 
        : <Multiple choices={choices} next={changeQuestion} correct={currentQuestionSet.correct_answer} />}
    </div>
  );
};

export default QuizData;
