// src/components/TaskList.tsx

import React from 'react';
import { Task } from '@/types/task'; // Taskを読み込む
import { TaskItem } from './TaskItem'; // TaskItemを読み込む

// TaskList部品が受け取る情報
interface TaskListProps {
  tasks: Task[]; // 表示したいタスクのリスト（配列）
  onToggleComplete: (id: string) => void; // TaskItemに渡す、チェックボックス切り替え関数
  onDelete: (id: string) => void; // TaskItemに渡す、削除関数
}

// TaskList部品
// `tasks`、`onToggleComplete`、`onDelete` の3つの情報を受け取る
export function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  // もしタスクが一つもなければ、メッセージを表示する
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        タスクはありません。新しいタスクを追加しましょう！
      </p>
    );
  }

  // タスクがあれば、それぞれのタスクをTaskItemとして表示する
  return (
    <div style={{ padding: '0 10px' }}>
      {/* tasksの配列の中身を一つずつ取り出して、TaskItemとして画面に並べる */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id} // Reactがリストの要素を区別するための鍵（必ず必要！）
          task={task} // 各タスクの情報をTaskItemに渡す
          onToggleComplete={onToggleComplete} // 親からもらった関数をTaskItemにそのまま渡す
          onDelete={onDelete} // 親からもらった関数をTaskItemにそのまま渡す
        />
      ))}
    </div>
  );
}