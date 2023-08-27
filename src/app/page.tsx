'use client';

import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';

interface Task {
  title: string;
  description: string;
  timestamp: string;
}

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    const timestamp = new Date().toISOString();
    setTasks([...tasks, { title, description, timestamp }]);
    setTitle('');
    setDescription('');
  };

  return (
    <div >
      <div >
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <h1 className="text-3xl mb-6 text-center">Cadastro de Tarefas</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 h-20 rounded bg-white text-black"
          ></textarea>
        </div>

        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>

        <ul className="mt-6 text-left">
          {tasks.map((task, index) => (
            <li key={index} className="mb-2">
              {task.title} - {task.description} - {task.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
