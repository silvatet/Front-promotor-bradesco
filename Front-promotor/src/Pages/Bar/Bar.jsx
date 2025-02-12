import React from "react";
import { useNavigate } from "react-router-dom";
import "./Bar.css"; // Arquivo de estilo

const Bar = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>BAR</h1>

      <div className="input-field">
        <h2>LEIA O CARTÃO</h2>
        <p>BAR</p>
      </div>

      <div className="nfc-icon">
        <img src="/nfc-icon.png" alt="NFC" />
      </div>

      <button onClick={() => navigate(-1)}>VOLTAR</button>
    </div>
  );
};

export default Bar;
