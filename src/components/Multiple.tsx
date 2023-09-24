import React, { useEffect, useState, FC, MouseEvent } from 'react';

interface Props {
  choices: string[];
  correct: string;
  next: () => void;
  lives: () => void;
}

const Multiple: FC<Props> = ({ choices, correct, next, lives }) => {
  const [formattedChoices, setFormattedChoices] = useState<string[]>([]);
  const [clickEnabled, setClickEnabled] = useState(true);

  useEffect(() => {
    formatChoices(choices);
  }, [choices]);

  const formatChoices = (choices: string[]) => {
    const formatted = choices.map((choice) => {
      return choice.replaceAll("&#039;", "'").replaceAll("&quot;", "\"");
    });

    setFormattedChoices(formatted);
  }

  const handleAnswer = (e: MouseEvent<HTMLLIElement>) => {
    if (!clickEnabled) {
      return; // Clicking is disabled, ignore the click event
    }

    // Disable clicking to prevent further clicks
    setClickEnabled(false);

    const checkAns = e.currentTarget;
    const value = checkAns.getAttribute("value");

    if (value === correct) {
      console.log("correct");
      checkAns.classList.add("correct-answer");
    } else {
      console.log("incorrect");
      checkAns.classList.add("incorrect-answer");
      lives();
    }

    setTimeout(() => {
      // Enable clicking after a delay (e.g., 1 second)
      setClickEnabled(true);

      // Remove the classes and proceed to the next question
      if (checkAns) {
        checkAns.classList.remove("correct-answer", "incorrect-answer");
      }
      next();
    }, 1500); // Adjust the delay as needed
  }

  return (
    <ul className='choices'>
      {formattedChoices.map((option, index) => (
        <li key={index} value={option} onClick={handleAnswer}>
          <div>{option}</div>
        </li>
      ))}
    </ul>
  );
};

export default Multiple;
