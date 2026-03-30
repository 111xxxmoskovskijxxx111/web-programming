import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('all'); 


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  
  const addTask = useCallback((text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }, []);

  const editTask = useCallback((id, newText) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  
  const contextValue = useMemo(
    () => ({
      tasks, filter, theme, setFilter, addTask, deleteTask, toggleTask, editTask, toggleTheme,
    }),
    [tasks, filter, theme, addTask, deleteTask, toggleTask, editTask, toggleTheme]
  );

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};