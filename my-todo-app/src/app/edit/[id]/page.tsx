// src/app/edit/[id]/page.tsx (S8,S9)

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
// ★ここを変更！taskStorageから必要な関数を読み込むよ！
import { loadTasks, saveTasks, getTaskById } from '@/lib/taskStorage';

import Modal from '@/components/Modal'; // <- この行を追加！

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

const EditTaskPage: React.FC<EditTaskPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [taskFound, setTaskFound] = useState(true);

  const [showSuccessModal, setShowSuccessModal] = useState(false); // <- この行を追加！


  useEffect(() => {
    if (id) {
      const taskToEdit = getTaskById(id);

      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || ''); // descriptionがundefinedなら空文字列に！
        setTaskFound(true);
      } else {
        setTaskFound(false);
        setError('指定されたタスクが見つかりません。');
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    if (!taskFound) {
      return;
    }

    // ★ここを変更！まずは全てのタスクを loadTasks() で読み込むよ！
    let tasks: Task[] = loadTasks();

    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, title, description };
      }
      return task;
    });

    // ★ここを変更！更新したタスクリストを saveTasks() で保存するよ！
    saveTasks(updatedTasks);

    setShowSuccessModal(true); // <-- ここを追加！成功したらポップアップを表示する
  };

   // ★ポップアップを閉じるための関数も作っておこう！
  const handleCloseModal = () => { // <- この関数を追加！
    setShowSuccessModal(false); // ポップアップを閉じる
    router.push(`/`); // 編集が終わったら、編集したタスクの詳細ページに戻る
                                // もしくは、router.push('/') で一覧に戻ってもOKだよ！
  };

  if (!taskFound && id) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
        <h2>エラー</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          タスク一覧に戻る
        </button>
      </div>
    );
  }

  if (!id) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
        <p>タスク情報を読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>タスク編集ページ</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            タスクのタイトル (入力必須)
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            style={{ width: '100%', padding: '10px', border: error ? '2px solid red' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            placeholder="タスクのタイトルを入力してください"
          />
          {error && <p style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>{error}</p>}
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            タスクの詳細 (入力任意)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
            placeholder="タスクの詳細を入力してください (任意)"
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1em',
              flex: 1,
              marginRight: '10px'
            }}
          >
            戻る (キャンセル)
          </button>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1em',
              flex: 1,
              marginLeft: '10px'
            }}
          >
            変更を保存
          </button>
        </div>
      </form>

            {/* ★ここにModalコンポーネントを置くよ！ */}
      <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
        <h2 style={{
          textAlign: 'center',
          color: '#3C4B64',
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}>
          編集が完了しました！
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#555',
          marginBottom: '20px',
          fontSize: '16px',
        }}>
          タスクの情報が更新されました。
        </p>
        <button
          onClick={handleCloseModal} // このボタンが押されたらポップアップを閉じて詳細に戻る
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s ease',
          }}
        >
          タスク一覧に戻る
        </button>
      </Modal>

    </div>
  );
};

export default EditTaskPage;