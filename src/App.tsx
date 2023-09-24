import React, { useState, useEffect, ChangeEvent, FormEvent, useRef, MouseEvent } from 'react';
import './App.css';
import QuizData from './components/QuizData';
import FetchCategories from './api/FetchCategories';

function App() {
  // State variables
  const [menu, setMenu] = useState<boolean>(false);  //Whether the menu exists
  const [start, setStart] = useState<boolean>(true);  // Whether the intro exists
  const [categories, setCategories] = useState<any[]>([]); // Stores all the categories for selection tag
  const [category, setCategory] = useState<string>(""); // the category user chose
  const [type, setType] = useState<string>("");       // the type of question the user selected
  const [difficulty, setDifficulty] = useState<string>(""); // the difficulty the user chose
  const formRef = useRef<HTMLFormElement>(null);  // to handle the form
  const [values, setValues] = useState<string[]>([]); // stores the menu options as an array
   
  useEffect(() => { // On the initial load up, the useEffect executes once to fetch all the available categories
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
    setType("");
    setDifficulty("");
    setCategory("");
  };

  const handleStart = (e: MouseEvent<HTMLButtonElement>):void => {
    setStart(false);
    setMenu(true);
  };



  return (
    <div className='main'>
      {start ?                          //Into Screen
      <div className='start load-in'>
      <h1>Welcome to my trivia game!</h1> 
      <button onClick={handleStart}>Let's start</button>
      </div>
      :
      
      
    <div className='question-container load-in'>         
      { menu ? (    // Main menu screen to choose the type of quiz
        <div className='menu-container'>
          <h1>Choose your quiz!</h1>
          <form onSubmit={handleSubmit} ref={formRef} className='question-submit'>
            <select onChange={handleCategoryChange} value={category || ''} required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

          
              <p>Select Choice:</p>
              <div className='type'>
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

           
              <p>Select Difficulty:</p>
              <div className='difficulty'>
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
}
    </div>
  );
}

export default App;
