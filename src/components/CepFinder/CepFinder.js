import React, { useState } from 'react';
import './CepFinder.css';

function CepFinder() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddress = async () => {
    if (!cep || cep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setError('CEP não encontrado');
        setAddress(null);
      } else {
        setAddress(data);
      }
    } catch (err) {
      setError('Erro ao buscar CEP');
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cep-finder">
      <h2>Buscador de CEP</h2>
      <div className="cep-input">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          placeholder="Digite o CEP (apenas números)"
          maxLength="8"
        />
        <button onClick={fetchAddress} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {address && (
        <div className="address-result">
          <h3>Resultado:</h3>
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade/UF:</strong> {address.localidade}/{address.uf}</p>
        </div>
      )}
    </div>
  );
}

export default CepFinder;