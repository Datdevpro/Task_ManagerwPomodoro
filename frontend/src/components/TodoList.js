import React from 'react';
import { Edit, Trash2, Check, Clock } from 'lucide-react';
import './TodoList.css';

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos yet</h3>
        <p>Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="todo-content">
            <div className="todo-header">
              <h3 className="todo-title">{todo.title}</h3>
              <div className="todo-status">
                {todo.completed ? (
                  <span className="status-badge completed">
                    <Check size={14} />
                    Completed
                  </span>
                ) : (
                  <span className="status-badge pending">
                    <Clock size={14} />
                    Pending
                  </span>
                )}
              </div>
            </div>
            
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
          </div>

          <div className="todo-actions">
            <button
              onClick={() => onToggleComplete(todo)}
              className={`action-btn ${todo.completed ? 'undo-btn' : 'complete-btn'}`}
              title={todo.completed ? 'Mark as pending' : 'Mark as completed'}
            >
              {todo.completed ? <Clock size={16} /> : <Check size={16} />}
            </button>
            
            <button
              onClick={() => onEdit(todo)}
              className="action-btn edit-btn"
              title="Edit todo"
            >
              <Edit size={16} />
            </button>
            
            <button
              onClick={() => onDelete(todo.id)}
              className="action-btn delete-btn"
              title="Delete todo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

