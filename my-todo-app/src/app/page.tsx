// src/app/page.tsx

//タスク一覧ページ 本体
export default function HomePage() {
  return (
    <main style={{ padding: '20px' }}> {/* スタイルは後で直すから、今は気にしなくてOK */}
      <h1>TODOアプリ - タスク一覧</h1>
      <p>ここにタスクの一覧が表示されるよ！</p>
      <p>「新規タスクの作成」ボタンや、タスクを並べる場所になるんだ。</p>
    </main>
  );
}