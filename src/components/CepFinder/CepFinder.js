import React, { useState } from 'react';
import './CepFinder.css';

function CepFinder() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const fetchAddress = async () => {
    if (!cep || cep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return;
    }

    setLoading(true);
    setError(null);
    setCoordinates(null);
    
    try {
      // 1. Primeiro busca o endereço pelo CEP
      const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepData = await cepResponse.json();
      
      if (cepData.erro) {
        setError('CEP não encontrado');
        setAddress(null);
        return;
      }

      setAddress(cepData);
      
      // 2. Agora busca as coordenadas geográficas (geocoding)
      const locationQuery = `${cepData.logradouro}, ${cepData.bairro}, ${cepData.localidade}, ${cepData.uf}`;
      const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`
      );
      
      const nominatimData = await nominatimResponse.json();
      
      if (nominatimData.length > 0) {
        setCoordinates({
          lat: nominatimData[0].lat,
          lon: nominatimData[0].lon
        });
      } else {
        // Se não encontrar coordenadas exatas, tenta apenas com a cidade
        const cityResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cepData.localidade)}`
        );
        const cityData = await cityResponse.json();
        
        if (cityData.length > 0) {
          setCoordinates({
            lat: cityData[0].lat,
            lon: cityData[0].lon
          });
        }
      }
    } catch (err) {
      setError('Erro ao buscar informações de localização');
      console.error(err);
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
          
          {coordinates && (
            <div className="map-container">
              <h4>Localização no Mapa:</h4>
              <iframe
                title="Mapa do local"
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(coordinates.lon)-0.01},${parseFloat(coordinates.lat)-0.01},${parseFloat(coordinates.lon)+0.01},${parseFloat(coordinates.lat)+0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`}
              ></iframe>
              <br/>
              <small>
                <a 
                  href={`https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lon}#map=16/${coordinates.lat}/${coordinates.lon}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ver mapa maior
                </a>
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CepFinder;