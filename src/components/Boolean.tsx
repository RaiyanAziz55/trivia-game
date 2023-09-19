import React, { FC, MouseEvent } from 'react';

interface Props {
  correct: string;
  next: () => void;
}

const Boolean: FC<Props> = ({ correct, next }) => {
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
    <div>
      <ul>
      <li value="True" onClick={handleAnswer}>
          True
        </li>
        <li value="False" onClick={handleAnswer}>
          False
        </li>
      </ul>
    </div>
  );
}

export default Boolean;
