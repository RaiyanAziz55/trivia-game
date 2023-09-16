import React, { useEffect, useState } from 'react';
import FetchData from '../api/FetchData';

const QuizData = (props) => {
  const [data, setData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await FetchData(props.amount, props.category, props.type, props.difficulty);
        setData(fetchedData.results);

        // Set the currentQuestion state immediately after setting the data state
        setCurrentQuestion(fetchedData.results[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [props.amount, props.category, props.type, props.difficulty]);

  const changeQuestion = () => {
    if (questionIndex + 1 < data.length) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(data[questionIndex + 1]);
    }
  };

  return (
    <div className='question container'>
      {currentQuestion !== undefined ? (
        <div>
          <h1>{currentQuestion.question}</h1>
          <button onClick={changeQuestion}>Next Question</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default QuizData;
