import React, { useEffect, useState } from 'react';
import FetchData from '../api/FetchData';
import Boolean from './Boolean';
import Multiple from './Multiple';
import './css/quizData.css';

const QuizData = (props) => {
    const {amount, category, type, difficulty } = props;
  const [data, setData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestionSet, setCurrentQuestionSet] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [score, setScore] = useState();
 const [choices, setChoices] = useState([]);


 
 const setInitialValues = (fetchData) => {
    setData(fetchData);
    setCurrentQuestionSet(fetchData[0]);
    var c = JSON.parse((JSON.stringify(fetchData[0].incorrect_answers)));
    setChoices([JSON.stringify(fetchData[0].correct_answer).replaceAll("\"",""), ...c]);
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

  

  const updateChoices = (index) => {
    var c = JSON.parse((JSON.stringify(data[index].incorrect_answers)));
    setChoices([JSON.stringify(data[index].correct_answer).replaceAll("\"",""), ...c]);
  }
  const changeQuestion = () => {
    if (questionIndex + 1 < data.length) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestionSet(data[questionIndex + 1]);
      updateChoices(questionIndex + 1)
    }
  };
  const formatQuestion = (sum) => {
    var q = JSON.stringify(currentQuestionSet.question);
    q = q.replaceAll("&#039;", "\'");
    q = q.replaceAll("&quot;", "\"");
    return JSON.parse(q);
  }

  return (
    <div className='question-container'>
          <h1 className='question'>{currentQuestionSet.question}</h1>

       {/*   <Boolean next={changeQuestion} correct={currentQuestion.correct_answer}/> */}

          <Multiple choices={choices} next={changeQuestion} correct={currentQuestion.correct_answer} />
    </div>
  );
};

export default QuizData;
