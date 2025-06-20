// src/components/TaskList.tsx

import React from 'react';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

// TaskList部品が受け取る情報
interface TaskListProps {
  tasks: Task[]; // 表示したいタスクのリスト（配列）
  onToggleComplete: (id: string) => void; // TaskItemに渡す、チェックボックス切り替え関数
  // onDelete: (id: string) => void; // ★この行を削除またはコメントアウトしてね！
}

// TaskList部品
// `tasks`、`onToggleComplete`、`onDelete` の3つの情報を受け取る
export function TaskList({ tasks, onToggleComplete /*, onDelete*/ }: TaskListProps) { // ★onDeleteをここからも外す！
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        タスクはありません。新しいタスクを追加しましょう！
      </p>
    );
  }

  return (
    <div style={{ padding: '0 10px' }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          // onDelete={onDelete} // ★この行を削除またはコメントアウトしてね！
        />
      ))}
    </div>
  );
}