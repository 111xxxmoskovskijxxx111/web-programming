import React, { useState } from 'react';
import { type Task, filterTasks } from './types';
import { TaskForm } from './TaskForm';
import { List } from './List';
import { TaskCard } from './TaskCard';

const App: React.FC = () => {
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', type: 'bug', title: 'Fix login button', status: 'todo', severity: 'critical' },
    { id: '2', type: 'feature', title: 'Add dark mode', status: 'in-progress', priority: 1 }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = filterTasks(tasks, searchQuery);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Task Management Dashboard</h2>
      
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
      />

      <TaskForm onAddTask={handleAddTask} />

      {/* Передаємо дженерик-компоненту масив і функцію рендеру */}
      <List
        items={filteredTasks}
        renderItem={(task) => <TaskCard task={task} />}
      />
    </div>
  );
};

export default App;