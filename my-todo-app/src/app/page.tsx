// src/app/page.tsx (S1)

"use client";

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
// import { loadTasks, saveTasks, toggleTaskCompletion, deleteTask } from '@/lib/taskStorage'; // ★deleteTaskをここから外す！
import { loadTasks, saveTasks, toggleTaskCompletion } from '@/lib/taskStorage'; // ★こう変更！

import { TaskList } from '@/components/TaskList';
import Link from 'next/link';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = loadTasks();
    setTasks(storedTasks);
  }, []);

  const handleAddTask = ({ title, description }: { title: string; description?: string }) => {
    const newTask: Task = {
      id: crypto.randomUUID() as string,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = toggleTaskCompletion(id);
    setTasks(updatedTasks);
  };

  
//修正 BooleanをNumberに
  const sortedTasks = [...tasks].sort((a, b) => {
  return Number(a.completed) - Number(b.completed);
});
//

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '15px 0',
        backgroundColor: '#1E3A8A',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        fontSize: '2em',
      }}>TODOリスト
      </h1>    
        
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link href="/new" style={{ textDecoration: 'none' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFD700',
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

      <TaskList
        tasks={sortedTasks}
        onToggleComplete={handleToggleComplete}
      />
    </main>
  );
}