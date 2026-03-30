import React, { useContext } from 'react';
import { TaskProvider, TaskContext } from './TaskContext';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';
import './App.css';

const AppContent = () => {
  const { theme, toggleTheme } = useContext(TaskContext);

  return (
    <div className={`app-container ${theme}`}>
      <div className="app-wrapper">
        <header>
          <h1>React To-Do List</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            Тема: {theme === 'light' ? 'Світла 🌞' : 'Темна 🌙'}
          </button>
        </header>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
};

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;