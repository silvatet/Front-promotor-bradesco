import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Manutencaopontos.css"; // Verifique se este arquivo existe

const Manutencaopontos = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Manutenção de Pontos</h2>
      <form className="vertical-form">
        <h3>Leia o cartão</h3>
        <div className="nfc-icon">
          <img src="/nfc-icon.png" alt="NFC" /> {/* Verifique se a imagem existe em public/ */}
        </div>
        <button type="button" onClick={() => navigate("/setor")}>Voltar</button>
      </form>
      <p className="footer-text">HOLDING CLUBE</p>
    </div>
  );
};

export default Manutencaopontos;
