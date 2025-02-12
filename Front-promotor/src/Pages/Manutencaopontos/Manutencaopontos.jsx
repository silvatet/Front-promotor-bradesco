import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Manutencaopontos.css"; // Verifique se este arquivo existe

const Manutencaopontos = () => {
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("CPF inserido:", cpf);
    alert("Enviando CPF: " + cpf);
    navigate("/setor"); // Se quiser voltar ao setor após o envio
  };

  return (
    <div className="container">
      <h2>Manutenção de Pontos</h2>
      <form onSubmit={handleSubmit} className="vertical-form">
        <h3>Insira o CPF ou leia o cartão</h3>
        <div className='input-field'>
          <input 
            type="text" 
            placeholder='CPF' 
            value={cpf}
            onChange={(e) => setCpf(e.target.value)} 
          />
        </div>
        <div className="nfc-icon">
          <img src="/nfc-icon.png" alt="NFC" /> {/* Verifique se a imagem existe em public/ */}
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p className="footer-text">HOLDING CLUBE</p>
    </div>
  );
};

export default Manutencaopontos;
