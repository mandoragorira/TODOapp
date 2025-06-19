// app/success/page.tsx

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter(); // ここでuseRouterの道具を使う準備をするよ！

  // S1に戻るボタンがクリックされたら動く関数だよ
  const handleGoBackToList = () => {
    router.push('/'); // これでS1のトップページ（'/'）に移動するんだ！
  };

  return (
    <div 
    onClick={handleGoBackToList} // これを追加！
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#FFD700',
        borderRadius: '10px',
        padding: '40px 30px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333'
      }}>
        <h2 style={{ fontSize: '2em', margin: '0 0 20px 0' }}>タスクを登録しました!</h2>
        <p style={{ marginTop: '15px', color: '#333' }}>画面をタップして一覧に戻る</p>
      </div>
    </div>
  );
}