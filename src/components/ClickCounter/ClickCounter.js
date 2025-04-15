import React, { useState } from 'react';
import './ClickCounter.css';

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="click-counter">
      <h2>Contador de Cliques</h2>
      <p className="counter-display">Cliques: {count}</p>
      <div className="button-container">
        <button className="click-button" onClick={() => setCount(count + 1)}>
          Clique Aqui
        </button>
        <button className="reset-button" onClick={() => setCount(0)}>
          Zerar
        </button>
      </div>
    </div>
  );
}

export default ClickCounter;