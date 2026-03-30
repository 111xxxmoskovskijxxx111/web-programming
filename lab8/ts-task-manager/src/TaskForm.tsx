import React, { useState, useRef, useEffect } from 'react';
import type { Task } from './types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskType, setTaskType] = useState<'bug' | 'feature'>('bug');
  const [title, setTitle] = useState('');
  

  const titleInputRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    
    titleInputRef.current?.focus();
  }, [taskType]);

 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const baseTask = {
      id: crypto.randomUUID(), 
      title,
      status: 'todo' as const,
    };

    if (taskType === 'bug') {
      onAddTask({ ...baseTask, type: 'bug', severity: 'low' });
    } else {
      onAddTask({ ...baseTask, type: 'feature', priority: 1 });
    }
    
    setTitle('');
  };

  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px', color: '#333' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '15px' }}>
          <input 
            type="radio" 
            checked={taskType === 'bug'} 
            onChange={() => setTaskType('bug')} 
          /> Bug
        </label>
        <label>
          <input 
            type="radio" 
            checked={taskType === 'feature'} 
            onChange={() => setTaskType('feature')} 
          /> Feature
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter task title..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Add Task
        </button>
      </div>
    </form>
  );
};