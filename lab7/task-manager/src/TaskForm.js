import React, { useState, useRef, useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskForm = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null); 
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
      inputRef.current.focus(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Що потрібно зробити?"
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default TaskForm;