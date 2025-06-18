// src/types/task.ts

export interface Task {
  id: string; // タスクを識別するための一意なID
  title: string; // タスクのタイトル（必須）
  description?: string; // タスクの詳細（任意なので ? をつけるよ）
  completed: boolean; // タスクが完了しているかどうか
  createdAt: string; // タスクが作成された日時（文字列で保存することが多いよ）
}