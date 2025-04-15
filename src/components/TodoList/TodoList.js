import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Adicione uma tarefa"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? 'completed' : ''}
          >
            <span onClick={() => toggleTodo(index)}>
              {todo.text}
            </span>
            <button 
              className="remove-btn"
              onClick={() => removeTodo(index)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;