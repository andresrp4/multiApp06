import React, { useState } from 'react';
import './ClickCounter.css';

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="click-counter">
      <h2>Contador de Cliques</h2>
      <p>Cliques: {count}</p>
      <button onClick={() => setCount(count + 1)}>Clique Aqui</button>
      <button onClick={() => setCount(0)}>Zerar</button>
    </div>
  );
}

export default ClickCounter;