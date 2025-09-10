'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import api from '../lib/api';
//import Debug from '../components/debug';
import '../lib/amplify'; // Import Amplify configuration

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser({
        id: currentUser.userId,
        email: currentUser.signInDetails?.loginId || '',
      });
      fetchTasks();
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTask = async (taskId: number) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setTasks([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    // <div>
    //   <Debug />
      <Authenticator>
        {({ signOut, user: authUser }) => (
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {authUser?.signInDetails?.loginId}</span>
                    <button
                      onClick={signOut}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h2>
                    <form onSubmit={createTask} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Task title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Task description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          rows={3}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Create Task
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">Your Tasks</h2>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <li key={task.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <div className="ml-3">
                              <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {task.title}
                              </p>
                              {task.description && (
                                <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {task.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                    {tasks.length === 0 && (
                      <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                        No tasks yet. Create your first task above!
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </main>
          </div>
        )}
      </Authenticator>
    // </div>
  );
}
