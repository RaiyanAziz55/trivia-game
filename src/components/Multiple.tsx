import React, { useEffect, useState, FC, MouseEvent } from 'react';

interface Props {
  choices: string[];
  correct: string;
  next: () => void;
}

const Multiple: FC<Props> = ({ choices, correct, next }) => {
  const [formattedChoices, setFormattedChoices] = useState<string[]>([]);

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
    const value = e.currentTarget.getAttribute("value");

    if (value === correct) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    next();
  }

  return (
    <ul>
      {formattedChoices.map((option, index) => (
        <li key={index} value={option} onClick={handleAnswer}>
          {option}
        </li>
      ))}
    </ul>
  );
};

export default Multiple;
