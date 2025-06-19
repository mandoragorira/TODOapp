// src/app/page.tsx

"use client"; // このページはウェブブラウザ側で動かすよ！っていうおまじないだよ

import { useState, useEffect } from 'react'; // Reactの機能を使うためのimportだよ
import { Task } from '@/types/task'; // 作ったTaskの設計図を読み込むよ
import { loadTasks, saveTasks, toggleTaskCompletion, deleteTask } from '@/lib/taskStorage'; // タスクの倉庫番から関数を読み込むよ

// 作った部品たちを読み込むよ
import { TaskList } from '@/components/TaskList'; 
// 「新規タスクの作成」ボタンは、Next.jsのLinkコンポーネントを基に作るといい感じになるよ
// まだ作ってないけど、この後のためにButtonLinkという部品を仮で使うことにするね
// もしButtonLinkがなければ、普通の<a>タグや<button>タグでもOKだよ！
// import { ButtonLink } from '@/components/ButtonLink'; // これはまだ作ってないけど、後で使うかも！

import Link from 'next/link';

// このHomePageが、アプリのトップページだよ！
export default function HomePage() {
  // アプリに表示するタスクのリストを管理する状態変数だよ
  const [tasks, setTasks] = useState<Task[]>([]);

  // このページが初めて表示された時にだけ動く処理だよ（useEffectフック）
  useEffect(() => {
    // 倉庫番から保存されているタスクを読み込むよ
    const storedTasks = loadTasks();
    // 読み込んだタスクを状態変数にセットして、画面に表示されるようにするよ
    setTasks(storedTasks);
  }, []); // 空の配列[]は「この処理は最初の一回だけ動かすよ」っていう意味だよ

  // 新しいタスクを追加する関数だよ
  // TaskFormからタイトルと詳細を受け取るよ
  const handleAddTask = ({ title, description }: { title: string; description?: string }) => {
    const newTask: Task = {
      id: crypto.randomUUID() as string, // ユニークなIDを生成（string型だと明示するよ）
      title, // 受け取ったタイトル
      description: description || '', // 受け取った詳細（なければ空文字）
      completed: false, // 最初は未完了
      createdAt: new Date().toISOString(), // 今の日時（ISO形式の文字列）
    };
    const updatedTasks = [...tasks, newTask]; // 今のタスクリストに新しいタスクを追加
    saveTasks(updatedTasks); // localStorageに保存
    setTasks(updatedTasks); // 状態を更新して画面に反映
  };

  // タスクの完了状態を切り替える関数だよ
  const handleToggleComplete = (id: string) => {
    const updatedTasks = toggleTaskCompletion(id); // 倉庫番の関数を使って状態を切り替える
    setTasks(updatedTasks); // 状態を更新して画面に反映
  };

  // タスクを削除する関数だよ
  const handleDelete = (id: string) => {
    const updatedTasks = deleteTask(id); // 倉庫番の関数を使ってタスクを削除する
    setTasks(updatedTasks); // 状態を更新して画面に反映
  };

  // 設計図S1の通り、完了したタスクをリストの下の方に並べ替える処理だよ
  const sortedTasks = [...tasks].sort((a, b) => {
    // aが完了していてbが未完了なら、aをbより後に（下に）
    if (a.completed && !b.completed) {
      return 1;
    }
    // bが完了していてaが未完了なら、bをaより後に（下に）
    if (!a.completed && b.completed) {
      return -1;
    }
    // それ以外（両方完了か両方未完了）なら、そのままの順番
    return 0;
  });

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* 設計図S1の「タスク一覧」というタイトルだよ */}
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '15px 0', // 上下にも少し余白を追加するよ
        backgroundColor: '#1E3A8A', // 濃い紺色（CSSのカラーコードだよ）
        color: 'white', // 文字の色を白にするよ
        borderRadius: '8px', // 角を少し丸くするよ（S1のイメージっぽいかな？）
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // ほんの少し影をつけて立体感を出すよ
        fontSize: '2em', // 文字の大きさを少し大きくするよ
      }}>TODOリスト
      </h1>    
        
      {/* 「新規タスクの作成」ボタンだよ */}
      {/* S1のイメージに近づけるために、一旦普通の<button>タグで作るね。
          将来的には<ButtonLink>部品にすると、Next.jsのページ遷移と連携できて便利だよ！ */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="/new" style={{ textDecoration: 'none' }}> {/* styleで下線を消してるのは、Linkがデフォルトで下線を付けちゃうからだよ */}
        <button
          style={{
            padding: '15px 70px',
            backgroundColor: '#FFD700', // S1イメージの黄色っぽい色
            color: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          新規タスクの作成 ＋
        </button>
        </Link>
      </div>

      <hr style={{ margin: '30px 0', borderColor: '#eee' }} />

      {/* <h2>登録済みのタスク</h2> */}
      {/* TaskListが「タスクはありません」のメッセージを出すから、このh2はいったんコメントアウトしておくね */}
      
      {/* TaskList部品をここに置くよ！ */}
      {/* 読み込んだタスクのリストと、タスク操作の関数をTaskListに渡すよ */}
      <TaskList
        tasks={sortedTasks} // 並び替えたタスクのリストを渡すよ
        onToggleComplete={handleToggleComplete} // チェックボックス切り替え関数を渡すよ
        onDelete={handleDelete} // 削除関数を渡すよ
      />
    </main>
  );
}