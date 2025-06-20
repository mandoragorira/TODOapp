// app/new/page.tsx

"use client";

import Link from 'next/link';
import { useState } from 'react';
// ★TaskTypeとタスク保存の関数をインポートするよ！
import { Task } from '@/types/task'; // タスクの設計図
import { addTask } from '@/lib/taskStorage'; // タスクを追加する関数
import { useRouter } from 'next/navigation'; // ★これもおまじない！ページを移動させるために使うよ

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ★ページ移動のための道具を用意するよ
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // ★「登録」ボタンが押されたら呼ばれる関数だよ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // これがないとページがリロードされちゃうのを防ぐおまじない

    // まず、タイトルが入力されているかチェック！ (S6の対応)
    if (!title.trim()) { // titleが空っぽだったり、スペースだけだったりしたら...
      setErrorMessage('タイトルを入力してください'); // エラーメッセージを表示
      return; // ここで処理を止める！
    }

    // 新しいタスクのデータを作るよ！
    const newTask: Task = {
      //修正 crypto.randomUUID()にしていましたので、統一
      id: crypto.randomUUID(),   
      //
      title: title.trim(), // タイトルの前後のスペースを削除
      description: description.trim(), // 詳細の前後のスペースを削除
      completed: false, // 新しいタスクは最初は未完了だね
      createdAt: new Date().toISOString(), // ★これも追加しよう！日時も保存するよ
    };

    // 作ったタスクを保存するよ！
    addTask(newTask);

    // 保存が終わったら、登録完了ページ (S7) に移動するよ！
    // S7はまだ作ってないけど、今は仮でどこかに移動するってことにしておくね
    // とりあえず、今は成功したらトップページに戻るようにしておこうか
    // router.push('/') とか router.push('/success-page-for-task-creation') とか
    // S7のURLがどうなるかまだ決まってないから、一旦ここではトップページに戻るようにするね
    router.push('/success'); // ★S7用の仮のURLだよ！後で変更するかも！
  };

  return (
    <main style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f0f8ff',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#3C4B64',
        marginBottom: '30px',
        fontSize: '28px',
      }}>
        新しいタスクを作成
      </h1>

      {/* エラーメッセージを表示する場所 */}
      {errorMessage && (
        <p style={{
          color: 'red',
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}>
          {errorMessage}
        </p>
      )}

      {/* ★formタグに onSubmit を追加するよ！ */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* タスクのタイトル入力欄 */}
        <div>
          <label htmlFor="taskTitle" style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#555',
          }}>
            タスクのタイトル（入力必須）
          </label>
          <input
            type="text"
            id="taskTitle"
            placeholder="例: 買い物のリストを作る"
            value={title}
            onChange={handleTitleChange}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errorMessage ? 'red' : '#ccc'}`,
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* タスクの詳細入力欄 */}
        <div>
          <label htmlFor="taskDescription" style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#555',
          }}>
            タスクの詳細（入力任意）
          </label>
          <textarea
            id="taskDescription"
            placeholder="例: 牛乳、パン、卵を買う"
            rows={5}
            value={description}
            onChange={handleDescriptionChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
          ></textarea>
        </div>

        {/* ボタンたち */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          {/* 戻るボタン（S1へ移動） */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                minWidth: '120px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease',
              }}
            >
              戻る (S1)
            </button>
          </Link>

          {/* 登録ボタン（type="submit" なので、formのonSubmitを呼ぶよ） */}
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              minWidth: '120px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s ease',
            }}
          >
            タスクを登録
          </button>
        </div>
      </form>
    </main>
  );
}