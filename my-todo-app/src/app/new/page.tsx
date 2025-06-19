// app/new/page.tsx
"use client"; // ★この一行を一番上に追加するよ！

import Link from 'next/link'; // ページ移動のためにLinkを使うよ
import { useState } from 'react';

// このページが表示されたときに使われる関数だよ
export default function NewTaskPage() {
  // 後でここに「入力された文字を覚えておく場所」を作るよ
  // 今はとりあえず、フォームの見た目だけ作っちゃおう！

  // タイトルのメモ帳を用意するよ
  // title という変数に今の入力値が入る
  // setTitle という関数で入力値を更新する
  // '' は最初、何も入ってない状態だよ、って意味
  const [title, setTitle] = useState('');

  // 詳細のメモ帳を用意するよ
  const [description, setDescription] = useState('');

  // エラーメッセージのメモ帳も用意しておくよ（今は空っぽ）
  const [errorMessage, setErrorMessage] = useState('');

  // 入力欄に文字が入力されたときに、メモ帳に書き込む関数
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value); // 入力された値をメモ帳（title）に書き込む
    // タイトルが入力されたらエラーメッセージは消す
    if (errorMessage) { // エラーメッセージがある場合だけ消す
      setErrorMessage('');
    }
  };

  // 詳細欄に文字が入力されたときに、メモ帳に書き込む関数
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value); // 入力された値をメモ帳（description）に書き込む
  };


  return (
    <main style={{
      maxWidth: '600px', // ページの最大幅を制限して、見やすくする
      margin: '40px auto', // 上下の余白と左右中央寄せ
      padding: '30px',
      backgroundColor: '#f0f8ff', // 薄い水色の背景
      borderRadius: '12px', // 角を丸くする
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // 影を追加
      fontFamily: 'sans-serif', // 見やすいフォントに
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#3C4B64', // 紺色
        marginBottom: '30px',
        fontSize: '28px',
      }}>
        新しいタスクを作成
      </h1>

      {/* ここからフォームの部品だよ */}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            id="taskTitle" // どの入力欄か分かるように名前をつけてるよ
            placeholder="例: 買い物のリストを作る" // 入力例を表示するよ
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box', // パディングを含めて幅を計算するおまじない
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
            id="taskDescription" // どの入力欄か分かるように名前をつけてるよ
            placeholder="例: 牛乳、パン、卵を買う" // 入力例を表示するよ
            rows={5} // 行数を指定するよ
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical', // 縦方向にはサイズを変えられるようにする
            }}
          ></textarea>
        </div>

        {/* ボタンたち */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          {/* 戻るボタン（S1へ移動） */}
          <Link href="/" style={{ textDecoration: 'none' }}> {/* トップページへ戻るよ */}
            <button
              type="button" // フォーム送信じゃないよ、って教えてる
              style={{
                backgroundColor: '#6c757d', // グレー
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                minWidth: '120px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease', // マウスオーバー時のアニメーション
              }}
            >
              戻る
            </button>
          </Link>

          {/* 登録ボタン（今はまだ何も起こらないよ） */}
          <button
            type="submit" // フォームを送信するボタンだよ
            style={{
              backgroundColor: '#007bff', // 青色
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