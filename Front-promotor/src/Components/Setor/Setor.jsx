import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setor.css";

const Setor = () => {
  const navigate = useNavigate();
  const [nfcCode, setNfcCode] = useState(""); // Armazena apenas o código mais recente

  // Simula a leitura de um código NFC
  const handleScan = () => {
    const newCode = `NFC-${Math.floor(Math.random() * 10000)}`; // Gera um ID aleatório
    setNfcCode(newCode); // Substitui o código anterior pelo novo
  };

  return (
    <div className="container">
      <h2>Escolha um Setor</h2>

      <div className="setor-buttons">
        <button onClick={() => navigate("/Bar")}>🍻 Bar</button>
        <button onClick={() => navigate("/passe-cartao")}>🔄 Return de Machine</button>
        <button onClick={() => navigate("/manutencaopontos")}>⚙️ Manutenção de Pontos</button>


      </div>

      <div className="nfc-section">
        <h3>Registro de NFC</h3>
        <button onClick={handleScan}>📡 Simular Leitura NFC</button>
        {nfcCode && <p>Código NFC Atual: <strong>{nfcCode}</strong></p>}
      </div>
    </div>
  );
};

export default Setor;
