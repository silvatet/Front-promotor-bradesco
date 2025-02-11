import React from "react";
import { useNavigate } from "react-router-dom";
import "./PasseCartao.css";

const PasseCartao = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Passe o Cartão</h2>
      <p>Aproxime seu cartão para continuar.</p>

      <button onClick={() => navigate("/proxima-tela")}>➡️ Próximo</button>
      <button onClick={() => navigate("/confirmacao-pontos")}>✅ Confirmar Pontos</button>
    </div>
  );
};

export default PasseCartao;
