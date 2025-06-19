// src/components/TaskItem.tsx

"use client";

import React from 'react';
import { Task } from '@/types/task';
import Link from 'next/link';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: task.completed ? '#e0ffe0' : '#f9f9f9',
  };

  const handleDeleteClick = () => {
    if (window.confirm('このタスクを削除しますか？')) {
      onDelete(task.id);
    }
  };

  return (
    <div style={itemStyle}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        style={{ marginRight: '10px', transform: 'scale(1.2)' }}
      />
      
      <Link
        href={`/tasks/${task.id}`}
        style={{
          flexGrow: 1,
          
          // この2行は残すよ！
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#777' : '#333',
          cursor: 'pointer'
        }}
      >
        {task.title}
      </Link>

      <button
        onClick={handleDeleteClick}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '0.9em',
        }}
      >
        削除
      </button>
    </div>
  );
}