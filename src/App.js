import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import ClickCounter from './components/ClickCounter/ClickCounter';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Calculator from './components/Calculator/Calculator';
import CepFinder from './components/CepFinder/CepFinder';

function App() {
  const [activeComponent, setActiveComponent] = useState('TodoList');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TodoList':
        return <TodoList />;
      case 'ClickCounter':
        return <ClickCounter />;
      case 'TicTacToe':
        return <TicTacToe />;
      case 'Calculator':
        return <Calculator />;
      case 'CepFinder':
        return <CepFinder />;
      default:
        return <TodoList />;
    }
  };

  return (
    <div className="App">
      <Header setActiveComponent={setActiveComponent} />
      <main>
        {renderComponent()}
      </main>
    </div>
  );
}

export default App;