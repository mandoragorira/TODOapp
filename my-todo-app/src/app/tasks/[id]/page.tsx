// app/tasks/[id]/page.tsx

"use client"; // ★ブラウザ側で動くおまじないだよ！useRouterを使うから必要！

import React from 'react';
import { useRouter } from 'next/navigation'; // S1に戻るために使うよ！
import { getTaskById, deleteTask } from '@/lib/taskStorage'; // タスクを読み込む関数と、削除関数を読み込むよ！
import { Task } from '@/types/task'; // Taskの型も必要だね

// S2ページ（タスク詳細ページ）のコンポーネントだよ
export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter(); // ページ遷移の道具を使えるようにするよ
  const { id } = params; // URLからタスクのIDを取り出すよ

  // そのIDのタスクをLocalStorageから読み込むよ
  const task: Task | undefined = getTaskById(id);

  // もしタスクが見つからなかったら（例えば、削除されちゃった後とか）
  if (!task) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8d7da', // 赤っぽい背景色にしてエラーっぽく
        color: '#721c24',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ fontSize: '2em' }}>おっと、タスクが見つからないよ！😥</h1>
        <p style={{ fontSize: '1.2em', marginTop: '20px' }}>このタスクは存在しないか、すでに削除された可能性があります。</p>
        <button
          onClick={() => router.push('/')} // S1に戻るボタン
          style={{
            backgroundColor: '#a4c2f4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '12px 25px',
            fontSize: '1.2em',
            cursor: 'pointer',
            marginTop: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          一覧に戻る 
        </button>
      </div>
    );
  }

  // S3への削除確認ステップ
  const handleConfirmDelete = () => {
    // S3の図の通り「このタスクを削除しますか？」という確認を出すよ
    const confirmDelete = window.confirm(`「${task.title}」を削除しますか？

このタスクは元に戻せません。`);
    if (confirmDelete) {
      deleteTask(task.id); // taskStorage.tsのdeleteTaskを呼んで削除！
      router.push('/deleted-success'); // S4のページに仮で遷移するよ！
      // 後でS4ページをちゃんと作ったら、このパスをそれに合わせるね
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f0f8ff', // S2イメージの背景色に近い色
      minHeight: '100vh',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '15px 0',
        backgroundColor: '#1E3A8A', // S2イメージのヘッダー色
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        fontSize: '2em',
      }}>タスク詳細 </h1>

      {/* タスクのタイトルと詳細の表示部分 */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '1.8em',
          marginBottom: '15px',
          color: '#333',
          wordBreak: 'break-word' // 長いタイトルでもはみ出さないように
        }}>
          {task.title}
        </h2>
        <p style={{
          fontSize: '1.1em',
          color: '#555',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap', // 改行をそのまま表示するよ
          wordBreak: 'break-word' // 長い詳細でもはみ出さないように
        }}>
          {task.description || '詳細はありません'} {/* descriptionが空の場合はメッセージを表示 */}
        </p>
      </div>

      {/* S2の図にあるボタンたち */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around', // ボタンを横に均等に並べる
        marginTop: '30px'
      }}>
        {/* 戻るボタン (S1へ) */}
        <button
          onClick={() => router.push('/')} // S1のトップページに戻るよ！
          style={{
            backgroundColor: '#a4c2f4', // 青っぽい色
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '12px 25px',
            fontSize: '1.2em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flex: 1, // スペースを均等に使う
            marginRight: '10px' // 少し隙間を開ける
          }}
        >
          戻る 
        </button>

        {/* 削除ボタン (S3へ進む) */}
        <button
          onClick={handleConfirmDelete} // 削除確認の関数を呼ぶよ！
          style={{
            backgroundColor: '#ff6961', // 赤っぽい色
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '12px 25px',
            fontSize: '1.2em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flex: 1 // スペースを均等に使う
          }}
        >
          削除 
        </button>
      </div>
    </div>
  );
}