import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';


const TaskItem = ({ task = { id: 0, text: 'Невідоме завдання', completed: false } }) => {
  const { toggleTask, deleteTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      editTask(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>Зберегти</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span className="task-text">{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Редагувати</button>
        </>
      )}
      <button onClick={() => deleteTask(task.id)}>Видалити</button>
    </li>
  );
};

export default TaskItem;