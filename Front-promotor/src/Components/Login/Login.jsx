import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (event) => { // 🔥 Agora o nome está correto
    event.preventDefault();

    console.log("teste", username, password);
    alert("Enviando os dados: " + username + " - " + password);

    // Após o login, redireciona para a tela de Setor
    navigate("/setor");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}> {/* 🔥 Agora está chamando a função correta */}
        <h1>Login do promotor</h1>

        <div className='input-field'>
          <input 
            type="text" 
            placeholder='Usuário' 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className='input-field'>
          <input 
            type="password" 
            placeholder='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div className="racall-forget">
          <label htmlFor=''>
            <input type="checkbox" /> Lembre de mim 
            <a href='#'> Esqueceu a Senha?</a>
          </label>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
