import React from 'react';
import { type Task, isHighPriorityBug } from './types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  
  const isHot = isHighPriorityBug(task);
  

  const borderColor = task.type === 'bug' ? '#ff4d4f' : '#52c41a';
  const backgroundColor = isHot ? '#fff1f0' : '#ffffff';

  return (
    <div style={{ 
      border: `2px solid ${borderColor}`, 
      padding: '15px', 
      borderRadius: '8px',
      backgroundColor,
      color: '#333'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>
        {task.title} {isHot && '🔥 CRITICAL'}
      </h3>
      <p style={{ margin: '5px 0' }}><strong>Status:</strong> {task.status}</p>
      
      {/* Type Narrowing: TypeScript розуміє, який це тип завдяки полю "type" */}
      {task.type === 'bug' ? (
        <p style={{ margin: '5px 0' }}><strong>Severity:</strong> {task.severity}</p>
      ) : (
        <>
          <p style={{ margin: '5px 0' }}><strong>Priority:</strong> {task.priority}</p>
          {task.expectedRelease && (
            <p style={{ margin: '5px 0' }}><strong>Release:</strong> {task.expectedRelease}</p>
          )}
        </>
      )}
    </div>
  );
};