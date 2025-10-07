import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [formData, setFormData] = useState({
    title: editingTodo?.title || '',
    description: editingTodo?.description || '',
    completed: editingTodo?.completed || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      if (!editingTodo) {
        setFormData({ title: '', description: '', completed: false });
      }
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter todo title..."
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (optional)..."
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">Mark as completed</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTodo ? (
              <>
                <Save size={16} />
                Update Todo
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Todo
              </>
            )}
          </button>
          
          {editingTodo && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              <X size={16} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

