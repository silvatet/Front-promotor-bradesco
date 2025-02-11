import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmacaoPontos.css';

const ConfirmacaoPontos = () => {
  const navigate = useNavigate();

  // Simula um número aleatório de pontos ganhos
  const pontosGanhos = Math.floor(Math.random() * 100) + 10;

  return (
    <div className="container">
      <h2>🎉 Confirmação de Pontos 🎉</h2>
      <p className="points">Você ganhou <strong>{pontosGanhos}</strong> pontos!</p>
      
      <div className="buttons">
        <button onClick={() => navigate("/")}>🏠 Voltar ao Início</button>
        <button onClick={() => navigate("/setor")}>🔄 Escolher Outro Setor</button>
      </div>
    </div>
  );
};

export default ConfirmacaoPontos;
