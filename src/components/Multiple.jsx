import React from 'react'

const Multiple = (props) => {
    const handleAnswer = (e) => {
        if (e.target.value === props.correct){
            console.log("correct")
        }else{
            console.log("incorrect")
        }
        props.next();
    }
    const formatChoices = () => {
        for (let i = 0; i < props.choices.length; i++) {
            props.choices[i] = props.choices[i].replaceAll("&#039;", "\'");
            props.choices[i] = props.choices[i].replaceAll("&quot;", "\"");
          }
    }

    formatChoices();
  return (
    <ul>
            {props.choices.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name={`question`}
                  value={option}
                  onChange={handleAnswer}
                />
                {option}
              </li>
            ))}
          </ul>
  )
}

export default Multiple