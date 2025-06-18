// src/components/TaskItem.tsx

import React from 'react';
import { Task } from '@/types/task'; // 作ったTaskを読み込む

// TaskItem部品が受け取る情報
interface TaskItemProps {
  task: Task; // 表示したい一つのタスクの情報
  onToggleComplete: (id: string) => void; // チェックボックスが押された時に呼ばれる関数
  onDelete: (id: string) => void; // 削除ボタンが押された時に呼ばれる関数
}

// TaskItem
// `task`、`onToggleComplete`、`onDelete` の3つの情報を受け取る
export function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  // 完了したタスクかどうかで、見た目を変えるためのスタイル
  // もしtask.completedがtrue（完了）なら、文字に打ち消し線と色を付ける
  const itemStyle: React.CSSProperties = {
    display: 'flex', // アイテムを横に並べる
    alignItems: 'center', // 縦方向の真ん中に揃える
    padding: '10px 15px', // 内側の余白
    border: '1px solid #ddd', // 薄い灰色の枠線
    borderRadius: '5px', // 角を少し丸くする
    marginBottom: '10px', // 下に余白を作る
    backgroundColor: task.completed ? '#e0ffe0' : '#f9f9f9', // 完了したら薄い緑色、そうでなければ薄い灰色
    textDecoration: task.completed ? 'line-through' : 'none', // 完了したら打ち消し線
    color: task.completed ? '#777' : '#333', // 完了したら文字の色を薄くする
  };

  // 削除ボタンが押された時の処理
  const handleDeleteClick = () => {
    // 本当に削除していいか、確認のメッセージを出す
    if (window.confirm('このタスクを削除しますか？')) {
      // 「はい」と答えたら、親からもらったonDelete関数にこのタスクのIDを渡して呼ぶ
      onDelete(task.id);
    }
  };

  return (
    <div style={itemStyle}>
      {/* チェックボックス */}
      <input
        type="checkbox"
        checked={task.completed} // タスクの完了状態と連動させる
        onChange={() => onToggleComplete(task.id)} // チェックボックスが押されたらonToggleCompleteを呼ぶ
        style={{ marginRight: '10px', transform: 'scale(1.2)' }} // 右に余白と少し大きく表示
      />
      
      {/* タスクのタイトル */}
      <span style={{ flexGrow: 1, cursor: 'pointer' }}> {/* flexGrow: 1 で残りのスペースを全部使う */}
        {task.title}
      </span>

      {/* 削除ボタン */}
      <button
        onClick={handleDeleteClick}
        style={{
          marginLeft: '10px', // 左に余白
          padding: '5px 10px',
          backgroundColor: '#ff6b6b', // 赤っぽい色
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