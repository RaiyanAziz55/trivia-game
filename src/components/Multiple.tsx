import React, { useEffect, useState, FC, MouseEvent } from 'react';
import "../App.css"


interface Props {
  choices: string[];
  correct: string;
  next: () => void;
  lives: () => void;
  setScore: (number: number) => void;
  score: number;

}

const Multiple: FC<Props> = ({ choices, correct, next, lives, setScore, score }) => {
  const [formattedChoices, setFormattedChoices] = useState<string[]>([]);
  const [clickEnabled, setClickEnabled] = useState(true);

  useEffect(() => {  // Runs everytime there is a new question
    shuffleArray(choices);
    formatChoices(choices);

  }, [choices]);

  const shuffleArray = (array: string[]):void => { // Shuffles array so that every choices are randomized
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  const formatChoices = (choices: string[]) => { // Formats choices to replace unwanted characters
    const formatted = choices.map((choice) => {
      return choice.replaceAll("&#039;", "'").replaceAll("&quot;", "\"");
    });

    setFormattedChoices(formatted);
  }

  const handleAnswer = (e: MouseEvent<HTMLLIElement>) => {
    if (!clickEnabled) {
      return; // Clicking is disabled
    }

    // Disable clicking to prevent further clicks
    setClickEnabled(false);

    const checkAns = e.currentTarget;
    const value = checkAns.getAttribute("value");

    if (value === correct) {
      setScore(score+1);
      checkAns.classList.add("correct-answer");
    } else {
      checkAns.classList.add("incorrect-answer");
      const correctIndex = formattedChoices.findIndex((choice) => choice === correct);
      var correctListItem = checkAns.parentElement?.children[correctIndex];
  
      if (correctListItem) { // this is to show the correct answer if the user gets it wrong
        correctListItem.classList.add("correct-answer");
      }
  
      lives();
    }

    setTimeout(() => { // Pauses for 1 second so the user can see the correct answer
    
      setClickEnabled(true);

      
      if (checkAns) {
        checkAns.classList.remove("correct-answer", "incorrect-answer");
        if (correctListItem)
        correctListItem.classList.remove("correct-answer", "incorrect-answer");
      }
      next();
    }, 1000); 
  }

  return (
    <ul className={clickEnabled ? 'choices active' : 'choices'}>
      {formattedChoices.map((option, index) => (
        <li key={index} value={option} onClick={handleAnswer}   >
          <div>{option}</div>
        </li>
      ))}
    </ul>
  );
};

export default Multiple;
