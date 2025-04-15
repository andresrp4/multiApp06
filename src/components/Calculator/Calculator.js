import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [lastCalculation, setLastCalculation] = useState(false);

  const formatNumber = (num) => {
    if (!num || num === 'Erro') return num;
    
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    
    if (isNaN(numValue)) return num;
    
    if (Number.isInteger(numValue)) {
      if (numValue.toString().length > 8) {
        return numValue.toExponential(4);
      }
      return numValue.toString();
    }

    const str = numValue.toString();
    if (str.length > 10) {
      const [integer, decimal] = str.split('.');
      if (integer.length > 6) {
        return numValue.toExponential(4);
      }
      return numValue.toFixed(Math.min(6, decimal?.length || 0));
    }
    
    return str;
  };

  const handleClick = (value) => {
    if (lastCalculation && !isNaN(value)) {
      setInput(value);
      setResult('');
      setLastCalculation(false);
      return;
    }
    
    if (lastCalculation && ['+', '-', '*', '/'].includes(value)) {
      setInput(result + value);
      setResult('');
      setLastCalculation(false);
      return;
    }

    setInput(input + value);
    setLastCalculation(false);
  };

  const calculate = () => {
    try {
      const calculatedResult = eval(input).toString();
      setResult(calculatedResult);
      setLastCalculation(true);
    } catch (error) {
      setResult('Erro');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
    setLastCalculation(false);
  };

  return (
    <div className="calculator">
      <h2>Calculadora</h2>
      <div className="display">
        <div className="input" title={input}>{input || '0'}</div>
        <div className="result" title={result}>{formatNumber(result) || (input ? '' : '0')}</div>
      </div>
      <div className="buttons">
        <button className="digit" onClick={() => handleClick('7')}>7</button>
        <button className="digit" onClick={() => handleClick('8')}>8</button>
        <button className="digit" onClick={() => handleClick('9')}>9</button>
        <button className="operator" onClick={() => handleClick('+')}>+</button>
        
        <button className="digit" onClick={() => handleClick('4')}>4</button>
        <button className="digit" onClick={() => handleClick('5')}>5</button>
        <button className="digit" onClick={() => handleClick('6')}>6</button>
        <button className="operator" onClick={() => handleClick('-')}>-</button>
        
        <button className="digit" onClick={() => handleClick('1')}>1</button>
        <button className="digit" onClick={() => handleClick('2')}>2</button>
        <button className="digit" onClick={() => handleClick('3')}>3</button>
        <button className="operator" onClick={() => handleClick('*')}>×</button>
        
        <button className="digit" onClick={() => handleClick('0')}>0</button>
        <button className="digit" onClick={() => handleClick('.')}>.</button>
        <button className="equals" onClick={calculate}>=</button>
        <button className="operator" onClick={() => handleClick('/')}>÷</button>
        
        <button className="clear" onClick={clear}>C</button>
      </div>
    </div>
  );
}

export default Calculator;