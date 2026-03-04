import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { playTick } from '../../utils/audio';
import './TodoList.css';

export default function TodoList() {
  const { theme } = useTheme();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    const text = input.trim();
    if (!text || items.length >= 10) return;
    setItems(prev => [...prev, { id: nextId, text, done: false }]);
    setNextId(n => n + 1);
    setInput('');
    playTick();
  };

  const toggle = (id) => {
    setItems(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
    playTick();
  };

  const remove = (id) => {
    setItems(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="todo-section">
      <div className="todo-title">
        {theme === 'princess' ? "Today's Missions 📋" : "Today's Objectives ⚔️"}
      </div>
      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
          maxLength={80}
        />
        <button className="todo-add-btn" onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {items.map(t => (
          <li key={t.id} className="todo-item">
            <div
              className={`todo-check ${t.done ? 'checked' : ''}`}
              onClick={() => toggle(t.id)}
            >
              {t.done && '✓'}
            </div>
            <span className={`todo-text ${t.done ? 'done' : ''}`}>{t.text}</span>
            <button className="todo-del" onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
