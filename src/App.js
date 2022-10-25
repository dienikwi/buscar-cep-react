import { useState } from 'react';

import api from "./service/api";

import { FiSearch } from 'react-icons/fi';
import './estilo.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleProcurar() {
    if (input === '') {
      alert("Informe algum cep...");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/${input}/json`)
      return await response.json().then(function (data) {
      setCep(data);
      setInput("");
    })
    } catch {
      alert("Poxa, não foi possível buscar o cep...");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">Localizar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="bt-procurar" onClick={handleProcurar}>
          <FiSearch size={25} color="lightblue" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>DDD da região: {cep.ddd}</span>
        </main>
      )}

    </div>
  );
}

export default App;
