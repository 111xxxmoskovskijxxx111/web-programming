import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';


const TaskFilter = ({ defaultMessage = 'Фільтри:' }) => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="task-filter">
      <span>{defaultMessage}</span>
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        Всі
      </button>
      <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
        Активні
      </button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
        Виконані
      </button>
    </div>
  );
};

export default TaskFilter;