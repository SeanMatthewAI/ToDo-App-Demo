import React, { useState, useEffect } from 'react';
import { Plus, X, Check, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const App = () => {
  const DISABLE_AUTH = import.meta.env.VITE_DISABLE_AUTH === 'true';
  const { user } = DISABLE_AUTH ? { user: null } : useUser();
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const initialTodos = [
    { id: 1, text: 'Buy groceries', completed: true },
    { id: 2, text: 'Click the checkbox to complete tasks', completed: true },
    { id: 3, text: 'Add new tasks with the input below', completed: false }
  ];

  const storageKey = user ? `todos_${user.id}` : 'todos';

  useEffect(() => {
    const savedTodos = localStorage.getItem(storageKey);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(initialTodos);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setIsAdding(true);
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg">
            {totalCount === 0 ? 'No tasks yet. Add one below!' : 
             completedCount === totalCount ? '🎉 All tasks completed!' :
             `${completedCount} of ${totalCount} completed`}
          </p>
        </div>

        {!DISABLE_AUTH && (
          <SignedOut>
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
              <p className="text-2xl mb-4 text-white">Welcome! Please sign in to manage your tasks.</p>
              <SignInButton mode="modal">
                <button className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold flex items-center gap-2 mx-auto hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                  Sign In / Sign Up
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        )}

        {DISABLE_AUTH ? (
          <>
            {/* Todo List Container */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Input Section */}
          <div className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
              />
              <button
                onClick={addTodo}
                className={`px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 ${
                  isAdding ? 'scale-95' : 'hover:scale-105'
                } shadow-lg hover:shadow-purple-500/50`}
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>
          </div>

          {/* Todo Items */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {todos.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">Your task list is empty</p>
                <p className="text-sm mt-2">Add a task to get started!</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`group bg-purple-800/30 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-5 flex items-center gap-4 transition-all duration-500 hover:bg-purple-800/40 hover:border-purple-700/40 ${
                    isAdding && index === 0 ? 'animate-slideIn' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? 'bg-pink-500 border-pink-500'
                        : 'border-gray-400 hover:border-purple-400'
                    }`}
                  >
                    {todo.completed && (
                      <Check className="w-4 h-4 text-white animate-checkmark" />
                    )}
                  </button>
                  
                  <span
                    className={`flex-1 text-lg transition-all duration-300 ${
                      todo.completed
                        ? 'text-gray-500 line-through'
                        : 'text-white'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:bg-red-400/20 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
          </>
        ) : (
          <SignedIn>
            <div className="flex justify-end mb-4">
              <UserButton />
            </div>

            {/* Todo List Container */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Input Section */}
              <div className="mb-8">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="What needs to be done?"
                    className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                  />
                  <button
                    onClick={addTodo}
                    className={`px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 ${
                      isAdding ? 'scale-95' : 'hover:scale-105'
                    } shadow-lg hover:shadow-purple-500/50`}
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>

              {/* Todo Items */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {todos.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-xl">Your task list is empty</p>
                    <p className="text-sm mt-2">Add a task to get started!</p>
                  </div>
                ) : (
                  todos.map((todo, index) => (
                    <div
                      key={todo.id}
                      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-all duration-500 hover:bg-white/10 hover:border-white/20 ${
                        isAdding && index === 0 ? 'animate-slideIn' : ''
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          todo.completed
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent'
                            : 'border-gray-400 hover:border-purple-400'
                        }`}
                      >
                        {todo.completed && (
                          <Check className="w-4 h-4 text-white animate-checkmark" />
                        )}
                      </button>
                      
                      <span
                        className={`flex-1 text-lg transition-all duration-300 ${
                          todo.completed
                            ? 'text-gray-500 line-through'
                            : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                      
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:bg-red-400/20 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </SignedIn>
        )}

        {/* Footer Note */}
        <p className="text-center mt-8 text-gray-400 text-sm">
          ✨ Your tasks are stored in memory during this session
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes checkmark {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .animate-checkmark {
          animation: checkmark 0.3s ease-out forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;