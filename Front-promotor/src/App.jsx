import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Setor from './Components/Setor/Setor';
import PasseCartao from './Components/PasseCartao/PasseCartao';
import ConfirmacaoPontos from './Components/Confirmacaopontos/ConfirmacaoPontos';
import Manutencaopontos from './Pages/Manutencaopontos/Manutencaopontos';
import Perfil from './Pages/Perfil/Perfil'; // Importação do Perfil adicionada
import Bar from './Pages/Bar/Bar';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setor" element={<Setor />} />
          <Route path="/passe-cartao" element={<PasseCartao />} />
          <Route path="/confirmacao-pontos" element={<ConfirmacaoPontos />} />
          <Route path="/manutencaopontos" element={<Manutencaopontos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/bar" element={<Bar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
