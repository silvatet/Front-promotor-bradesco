import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Setor from './Components/Setor/Setor';
import PasseCartao from './Components/PasseCartao/PasseCartao';
import ConfirmacaoPontos from './Components/ConfirmacaoPontos/ConfirmacaoPontos';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setor" element={<Setor />} />
          <Route path="/passe-cartao" element={<PasseCartao />} />
          <Route path="/confirmacao-pontos" element={<ConfirmacaoPontos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
