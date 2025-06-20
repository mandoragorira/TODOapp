// src/app/edit-success/[id]/page.tsx (S10)

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// App Routerの動的ルートなので、paramsは受け取るけど、このページではIDは直接使わないよ
interface EditSuccessPageProps {
  params: {
    id: string; // URLから渡されるタスクIDだよ
  };
}

// SuccessPageと同じように、propsとしてparamsを受け取るようにするね
export default function EditSuccessPage({ params }: EditSuccessPageProps) {
  const router = useRouter();

  const handleGoBackToList = () => {
    router.push('/'); // S1のトップページに移動！
  };

  return (
    <div
    onClick={handleGoBackToList} // 画面をタップしたらS1に戻る
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#fff', 
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#2cb4ad', 
        borderRadius: '10px',
        padding: '40px 30px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '2em', margin: '0 0 20px 0' }}>タスクを編集しました!</h2> {/* ★メッセージを変更！ */}
        <p style={{ marginTop: '15px', color: '#fff' }}>画面をタップして一覧に戻る</p>
      </div>
    </div>
  );
}