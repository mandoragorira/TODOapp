// app/deleted-success/page.tsx

"use client"; // useRouterを使う可能性があるため

import React from 'react';
import { useRouter } from 'next/navigation';

export default function DeletedSuccessPage() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')} // 画面タップでS1に戻るようにするよ
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#ffffff', // 成功っぽい薄い緑色
        padding: '20px',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
    >
      <div style={{
        backgroundColor: '#2cb4ad',
        borderRadius: '10px',
        padding: '40px 30px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '2em', margin: '0' }}>タスクを削除しました</h2>
        <p style={{ marginTop: '15px', color: '#fff' }}>画面をタップして一覧に戻る</p>
      </div>
    </div>
  );
}