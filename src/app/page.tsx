'use client';

import { UserButton } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';

interface Task {
  title: string;
  description: string;
  timestamp: string;
}

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // carregar as tarefas do localStorage
  useEffect(() => {
    setIsLoaded(true);
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setIsLoaded(false);
  }, []);

  // salvar as tarefas no localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (titleInputRef.current && showForm) {
      titleInputRef.current.focus();
    }
  }, [tasks, showForm]);

  const addTask = () => {
    if (!title) {
      alert('Título é obrigatório');
      return;
    }
    const timestamp = new Date().toISOString();
    setTasks([...tasks, { title, description, timestamp }]);
    setTitle('');
    setDescription('');
  };

  const handleEditTask = (index: number) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setTasks(tasks.filter((_, i) => i !== index));
    setShowForm(true);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTask = [...tasks];
    updatedTask.splice(index, 1);
    setTasks(updatedTask);
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      {isLoaded ? (
        <div>Carregando...</div>
      ) : (
        <>
          {/* Barra de Menu Fixa */}
          <div className="fixed top-0 left-0 right-0 bg-blue-600 dark:bg-blue-800 text-white p-4 text-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Caixa de Entrada</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div
            className="pt-20 pb-32 overflow-y-auto flex-grow dark:text-white"
            style={{ marginBottom: '4rem' }}
          >
            <ul className="p-4 space-y-4 overflow-hidden">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="mb-2 bg-gray-100 p-2 rounded dark:bg-gray-700 dark:text-white"
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p>{task.description}</p>
                  <span className="text-sm text-gray-500">
                    {task.timestamp}
                  </span>
                  <button onClick={() => handleEditTask(index)}>Editar</button>
                  <button onClick={() => handleDeleteTask(index)}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Botão para Expandir/Recolher o Formulário */}
          <div className="fixed bottom-0 right-0 p-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white p-3 rounded-full"
            >
              +
            </button>
          </div>

          {/* Formulário Fixo na Base */}
          <div className="transition-all duration-300 ease-in-out">
            {showForm && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-200 dark:bg-gray-900 shadow-lg">
                {/* Botão para Recolher o Formulário */}
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-red-500 text-white p-2 rounded-full float-right"
                >
                  -
                </button>
                <div className="grid grid-cols-1 gap-2">
                  <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="p-2 h-16 rounded bg-white text-black dark:bg-gray-700 dark:text-white shadow-inner"
                  ></textarea>

                  <input
                    ref={titleInputRef}
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white shadow-inner"
                  />

                  <button
                    onClick={addTask}
                    className="bg-blue-500 dark:bg-blue-700 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 shadow"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
