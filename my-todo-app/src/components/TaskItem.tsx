// src/components/TaskItem.tsx

"use client";

import React from 'react';
import { Task } from '@/types/task';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ★これと

// TaskItem部品が受け取る情報
interface TaskItemProps {
  task: Task; // 表示したい一つのタスクの情報
  onToggleComplete: (id: string) => void; // チェックボックスが押された時に呼ばれる関数
  // onDelete: (id: string) => void; // ★この行を削除またはコメントアウトしてね！
}

// TaskItem
// `task`、`onToggleComplete`、`onDelete` の3つの情報を受け取る
export function TaskItem({ task, onToggleComplete /*, onDelete*/ }: TaskItemProps) { // ★onDeleteをここからも外す！
  const router = useRouter(); // ★ページ遷移の道具を使えるようにするよ！

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: task.completed ? '#e0ffe0' : '#f9f9f9',
  };

  // const handleDeleteClick = () => { // ★この関数もまるごと削除してね！
  //   if (window.confirm('このタスクを削除しますか？')) {
  //     onDelete(task.id);
  //   }
  // };

  return (
    <div style={itemStyle}>
      {/* チェックボックス */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        style={{ marginRight: '10px', transform: 'scale(1.2)' }}
      />
      
      {/* タスクのタイトルへのLink */}
      <Link
        href={`/tasks/${task.id}`}
        style={{
          flexGrow: 1,
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#777' : '#333',
          cursor: 'pointer'
        }}
      >
        {task.title}
      </Link>

      {/* 削除ボタン */}
      <button
        // onClick={handleDeleteClick} // ★ここを以下のように変更するよ！
        onClick={() => router.push(`/delete-confirm/${task.id}`)} // ★ボタンを押したらS3に移動！
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