import React from 'react';
import './Header.css';

function Header({ setActiveComponent }) {
  return (
    <header className="app-header">
      <h1>Aplicação Multifuncional</h1>
      <nav>
        <ul>
          <li><button onClick={() => setActiveComponent('TodoList')}>To-Do List</button></li>
          <li><button onClick={() => setActiveComponent('ClickCounter')}>Contador de Cliques</button></li>
          <li><button onClick={() => setActiveComponent('TicTacToe')}>Jogo da Velha</button></li>
          <li><button onClick={() => setActiveComponent('Calculator')}>Calculadora</button></li>
          <li><button onClick={() => setActiveComponent('CepFinder')}>Buscador de CEP</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;  