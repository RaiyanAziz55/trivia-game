import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import './App.css';
import QuizData from './components/QuizData';
import FetchCategories from './api/FetchCategories';

function App() {
  const [menu, setMenu] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null); 
  const [values, setValues] = useState<string[]>([]);
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories: any[] = await FetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getCategories();
  }, []);
    
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>):void => {
    setCategory(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setType(e.target.value);
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>):void => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    setMenu(false);
    setValues([category, type, difficulty]);
    console.log(values);
    setType("");
    setDifficulty("");
    setCategory("");
  };



  return (
    <div className='main'>
    <div className='question-container'>
      { menu ? (
        <div>
          <h3>Choose your quiz!</h3>
          <form onSubmit={handleSubmit} ref={formRef}>
            <select onChange={handleCategoryChange} value={category || ''} required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className='choices'>
              <p>Select Choice:</p>
              <label>
                <input
                  type="radio"
                  name="choice"
                  value="boolean"
                  checked={type === "boolean"}
                  onChange={handleTypeChange}
                  required
                />
                True/False
              </label>
              <label>
                <input
                  type="radio"
                  name="choice"
                  value="multiple"
                  checked={type === "multiple"}
                  onChange={handleTypeChange}
                  required
                />
                Multiple Choice
              </label>
              <label>
                <input
                  type="radio"
                  name="choice"
                  value="random"
                  checked={type === "random"}
                  onChange={handleTypeChange}
                  required
                />
                Random
              </label>
            </div>

            <div className='difficulty'>
              <p>Select Difficulty:</p>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === "easy"}
                  onChange={handleDifficultyChange}
                  required
                />
                Easy
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={difficulty === "medium"}
                  onChange={handleDifficultyChange}
                  required
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={difficulty === "hard"}
                  onChange={handleDifficultyChange}
                  required
                />
                Hard
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>

          </div>
      ) : ( 
        <QuizData amount={10} category={values[0]} type={values[1]} difficulty={values[2]} menu={setMenu} />
      )}
      </div>
    </div>
  );
}

export default App;
