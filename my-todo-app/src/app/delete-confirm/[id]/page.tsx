// app/delete-confirm/[id]/page.tsx (S3)

"use client"; // useRouterを使うから必要だよ！

import React from 'react';
import { useRouter } from 'next/navigation'; // ページ遷移の道具
import { getTaskById, deleteTask } from '@/lib/taskStorage'; // タスクを読み込む関数と削除関数
import { Task } from '@/types/task'; // Taskの型

export default function DeleteConfirmPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // URLからタスクのIDを取り出す

  // そのIDのタスクをLocalStorageから読み込む
  const task: Task | undefined = getTaskById(id);

  // もしタスクが見つからなかったら、エラーメッセージを表示してS1に戻るボタンを出す
  if (!task) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ fontSize: '2em' }}>おっと、タスクが見つからないよ！😥</h1>
        <p style={{ fontSize: '1.2em', marginTop: '20px' }}>このタスクは存在しないか、すでに削除された可能性があります。</p>
        <button
          onClick={() => router.push('/')}
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
          一覧に戻る (S1)
        </button>
      </div>
    );
  }

  // 「はい」ボタンが押された時の処理
  const handleYesClick = () => {
    deleteTask(task.id); // タスクを削除する！
    router.push('/deleted-success'); // 削除完了ページ (S4) へ移動！
  };

  // 「いいえ」ボタンが押された時の処理
  const handleNoClick = () => {
    // S3の図を見ると「いいえ」はS2に戻るから、S2のページに戻すよ
    router.push(`/tasks/${task.id}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#fff', // 背景色をS3イメージに近づける
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* S3のイメージにあるタスクタイトル表示部分 */}
      <div style={{
        backgroundColor: '#fdd835', // 黄色っぽい色
        borderRadius: '10px',
        padding: '20px 30px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: '#333',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '1.8em', margin: '0' }}>{task.title}</h2>
      </div>

      {/* S3のイメージにある「このタスクを削除しますか？」の部分 */}
      <div style={{
        backgroundColor: '#202f55', 
        borderRadius: '10px',
        padding: '40px 30px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: 'white' // 文字色を白に
      }}>
        <p style={{ fontSize: '1.8em', margin: '0 0 30px 0' }}>
          このタスクを削除しますか？
        </p>
        {/* 「はい」「いいえ」ボタン */}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
         <button
            onClick={handleNoClick}
            style={{
              backgroundColor: '#0075c2', 
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '15px 20px',
              fontSize: '1.2em',
              cursor: 'pointer',
              marginRight: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              flex: 1
            }}
          >
            いいえ
          </button>

          <button
            onClick={handleYesClick}
            style={{
              backgroundColor: '#d70035', 
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '15px 20px',
              fontSize: '1.2em',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              flex: 1
            }}
          >
            はい
          </button>
          
        </div>
      </div>
    </div>
  );
}