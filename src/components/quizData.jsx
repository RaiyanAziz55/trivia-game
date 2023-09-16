import React from 'react';
import { useEffect, useState } from 'react';
import FetchData from '../api/FetchData'


const QuizData = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const datas = await FetchData(props.amount, props.category, props.type, props.difficulty);
            setData(datas.results);
          };

          getData();
      }, [props.amount, props.category, props.type, props.difficulty]);
    
  return (
    <div className='question container'>
      {data.map((data, key) => (
        <div key={key}>
            <h2>{data.question}</h2>
            <button>True</button>
            <button>False</button>
            </div>
      ))}
  </div>
  )
}

export default QuizData;