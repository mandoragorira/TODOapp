// src/lib/taskStorage.ts

import { Task } from '@/types/task'; // さっき作ったTaskの設計図を読み込むよ

// localStorageにタスクを保存するときのキーの名前を決めておくよ
const STORAGE_KEY = 'todo-tasks';

/**
 * 新しいタスクをリストに追加する関数だよ。
 * @param newTask 追加したいTaskのデータ
 * @returns 新しいタスクが追加されたTaskの配列（リスト）
 */
export const addTask = (newTask: Task): Task[] => {
  // 今保存されているタスクのリストを読み込むよ
  const tasks = loadTasks();
  // 新しいタスクを既存のリストの先頭に追加するよ
  // (S1のスクリーンショットでは新しいものが上に来ているから、unshiftで先頭に追加するね)
  const updatedTasks = [newTask, ...tasks];
  // 更新されたリストをlocalStorageに保存するよ
  saveTasks(updatedTasks);
  // 更新されたリストを返すよ
  return updatedTasks;
};

/**
 * localStorageからタスクのリストを読み込む関数だよ。
 * @returns Taskの配列（リスト）を返すよ。もし何も保存されていなければ空の配列を返す。
 */
export const loadTasks = (): Task[] => {
  // localStorageから文字列として保存されているタスクデータを取得
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    try {
      // JSON形式の文字列をJavaScriptのオブジェクトに変換するよ
      // 保存時にcreatedAtをstringにしているから、読み込み時もそのままstringでOK
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      return parsedTasks;
    } catch (e) {
      // もしデータが壊れていたら、エラーが出ないように空の配列を返すよ
      console.error("Failed to parse tasks from localStorage", e);
      return [];
    }
  }
  // 何も保存されていなければ空の配列を返す
  return [];
};

/**
 * タスクのリストをlocalStorageに保存する関数だよ。
 * @param tasks 保存したいTaskの配列（リスト）
 */
export const saveTasks = (tasks: Task[]) => {
  // TaskのリストをJSON形式の文字列に変換してlocalStorageに保存するよ
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * 指定されたIDのタスクの完了状態を切り替える（完了 ⇔ 未完了）関数だよ。
 * @param id 完了状態を切り替えたいタスクのID
 * @returns 状態が更新された新しいTaskの配列（リスト）
 */
export const toggleTaskCompletion = (id: string): Task[] => {
  // 今保存されているタスクのリストを読み込むよ
  const tasks = loadTasks();
  // 該当のタスクを見つけて、completedの状態を反転させる（trueならfalse、falseならtrue）
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  // 更新されたリストをlocalStorageに保存するよ
  saveTasks(updatedTasks);
  // 更新されたリストを返すよ
  return updatedTasks;
};

/**
 * 指定されたIDのタスクを削除する関数だよ。
 * @param id 削除したいタスクのID
 * @returns タスクが削除された新しいTaskの配列（リスト）
 */
export const deleteTask = (id: string): Task[] => {
  // 今保存されているタスクのリストを読み込むよ
  const tasks = loadTasks();
  // 該当のタスク以外を新しいリストとして残す（つまり該当のタスクを削除する）
  const updatedTasks = tasks.filter((task) => task.id !== id);
  // 更新されたリストをlocalStorageに保存するよ
  saveTasks(updatedTasks);
  // 更新されたリストを返すよ
  return updatedTasks;
};