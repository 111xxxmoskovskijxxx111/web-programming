import React, { useContext, useMemo } from 'react';
import { TaskContext } from './TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, filter } = useContext(TaskContext);

  
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  
  const remainingCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  return (
    <div className="task-list-container">
      <p>Залишилось завдань: {remainingCount}</p>
      <ul>
        {filteredTasks.map((task) => (
          
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;