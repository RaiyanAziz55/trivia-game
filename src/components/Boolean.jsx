import React from 'react';
import { useState } from 'react';

const Boolean = (props) => {
    const handleAnswer = (e) => {
        if (e.target.value === props.correct){
            console.log("correct")
        }else{
            console.log("incorrect")
        }
        props.next();
    } 
  return (
    <div>
        <ul>
        <li className="answerOption">
        <input
          type="radio"
          name="radioGroup"
          value="True"
          onChange={handleAnswer}
        />
        true
        </li>
            <li>
            <input
          type="radio"
          name="radioGroup"
          value="False"
          onChange={handleAnswer}
        />
        False
            </li>
        </ul>
    </div>
  )
}

export default Boolean;