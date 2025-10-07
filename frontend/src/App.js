import React, { useState, useEffect } from 'react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await todoAPI.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle creating a new todo
  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  // Handle updating a todo
  const handleUpdateTodo = async (todoData) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(editingTodo.id, todoData);
      setTodos(prev => 
        prev.map(todo => todo.id === editingTodo.id ? updatedTodo : todo)
      );
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoAPI.deleteTodo(todoId);
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      } catch (err) {
        setError('Failed to delete todo');
        console.error('Error deleting todo:', err);
      }
    }
  };

  // Handle toggling todo completion
  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(prev => 
        prev.map(t => t.id === todo.id ? updatedTodo : t)
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Handle editing a todo
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Handle form submission (create or update)
  const handleSubmit = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleCreateTodo(todoData);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p>Manage your tasks with ease</p>
        </header>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchTodos} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        <main className="app-main">
          <TodoForm 
            onSubmit={handleSubmit}
            editingTodo={editingTodo}
            onCancel={handleCancelEdit}
          />

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Built with React & FastAPI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;







