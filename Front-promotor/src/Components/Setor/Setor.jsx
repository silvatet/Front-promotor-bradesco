import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setor.css";

const Setor = () => {
  const navigate = useNavigate();
  const [nfcData, setNfcData] = useState([]); // Armazena os dados NFC escaneados

  // Simula a leitura de um código NFC (ou código de barras)
  const handleScan = () => {
    const newCode = `NFC-${Math.floor(Math.random() * 10000)}`; // Simula um ID aleatório
    setNfcData([...nfcData, newCode]);
  };

  return (
    <div className="container">
      <h2>Escolha um Setor</h2>

      <div className="setor-buttons">
        <button onClick={() => navigate("/passe-cartao")}>🍻 Bar</button>
        <button onClick={() => navigate("/passe-cartao")}>🔄 Retorno de Máquina</button>
        <button onClick={() => navigate("/passe-cartao")}>⚙️ Manutenção de Pontos</button>
      </div>

      <div className="nfc-section">
        <h3>Registro de NFC</h3>
        <button onClick={handleScan}>📡 Simular Leitura NFC</button>
        <ul>
          {nfcData.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Setor;
