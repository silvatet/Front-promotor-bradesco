import React, { useState } from "react";
import axios from "axios";
import "./Perfil.css";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [cpfUsuario, setCpfUsuario] = useState(""); // CPF do usuário para busca
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [transacoes, setTransacoes] = useState([]);
  const [erroAPI, setErroAPI] = useState("");
  const [pontosAlteracao, setPontosAlteracao] = useState(""); // Entrada de pontos
  const navigate = useNavigate();

  const API_URL = `http://18.231.158.211:3335/Dashboard/GetBalanceByCpf`;
  const API_UPDATE_URL = `http://18.231.158.211:3335/Dashboard/UpdateBalance`;

  const formatarCPF = (cpf) => {
    if (cpf.length === 11) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    }
    return cpf;
  };

  const buscarCarteira = async () => {
    if (!cpfUsuario) {
      setErroAPI("Insira um CPF válido para buscar o saldo.");
      return;
    }

    try {
      console.log("🔹 Buscando carteira do usuário:", cpfUsuario);

      const response = await axios.get(API_URL, {
        headers: { Cpf: formatarCPF(cpfUsuario) },
        timeout: 10000,
      });

      console.log("🔹 Resposta da API:", response.data);

      if (!response.data || response.data.length === 0) {
        setErroAPI("Nenhuma transação encontrada para este CPF.");
        setSaldoAtual(0);
        setTransacoes([]);
        return;
      }

      const data = response.data;
      const transacoesArray = Array.isArray(data) ? data : [data];

      let totalPontos = 0;
      const transacoesFormatadas = transacoesArray.map((transacao) => {
        totalPontos += transacao.Impact || 0;
        return {
          origem: transacao.ImpactOrigin || "Origem Desconhecida",
          pontos: transacao.Impact || 0,
          pontosTotal: totalPontos, 
          horario: transacao.ImpactDate || "Data Indisponível",
        };
      });

      setSaldoAtual(totalPontos);
      setTransacoes(transacoesFormatadas);
      setErroAPI("");
    } catch (error) {
      console.error("❌ Erro ao buscar carteira:", error);
      setErroAPI("Erro ao conectar na API. Verifique sua conexão ou o servidor.");
    }
  };

  const alterarPontos = async (tipo) => {
    if (!cpfUsuario) {
      setErroAPI("Busque um CPF antes de adicionar/remover pontos.");
      return;
    }

    if (!pontosAlteracao || isNaN(pontosAlteracao)) {
      setErroAPI("Insira um valor válido para alterar os pontos.");
      return;
    }

    const valor = parseInt(pontosAlteracao, 10);
    const novoSaldo = tipo === "add" ? saldoAtual + valor : saldoAtual - valor;

    try {
      console.log(`🔹 Enviando requisição para ${tipo === "add" ? "adicionar" : "remover"} pontos...`);

      const response = await axios.post(API_UPDATE_URL, {
        Cpf: formatarCPF(cpfUsuario),
        Impact: tipo === "add" ? valor : -valor,
      });

      console.log("🔹 Resposta da API (alteração de pontos):", response.data);

      if (response.status === 200) {
        setSaldoAtual(novoSaldo);
        setErroAPI("");
        setPontosAlteracao("");
        buscarCarteira(); // Atualiza a carteira após alteração
      } else {
        setErroAPI("Erro ao atualizar os pontos. Tente novamente.");
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar pontos:", error);
      setErroAPI("Erro ao conectar na API para alteração de pontos.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", backgroundColor: "#f0f0f0", overflow: "hidden" }}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card className="perfil-container" sx={{ maxWidth: 600, width: "100%", p: 4, borderRadius: 4, textAlign: "center", overflow: "hidden" }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Perfil do Usuário - Gestão de Pontos
            </Typography>

            <TextField
              fullWidth
              label="CPF do Usuário"
              variant="outlined"
              value={cpfUsuario}
              onChange={(e) => setCpfUsuario(e.target.value)}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={buscarCarteira}
              sx={{ mt: 2 }}
            >
              Buscar Carteira
            </Button>

            {erroAPI && (
              <Typography color="error" sx={{ fontSize: 16, fontWeight: "bold", mt: 2 }}>
                {erroAPI}
              </Typography>
            )}

            <TableContainer component={Paper} className="tabela-container" sx={{ borderRadius: 2, mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>Origem</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>Pontos</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>Horário</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transacoes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: "center", fontSize: 16 }}>
                        Nenhuma transação encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transacoes.map((transacao, index) => (
                      <TableRow key={index}>
                        <TableCell>{transacao.origem}</TableCell>
                        <TableCell>{transacao.pontos}</TableCell>
                        <TableCell>{transacao.pontosTotal}</TableCell>
                        <TableCell>{transacao.horario}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Button fullWidth variant="contained" sx={{ mt: 3, backgroundColor: "#555" }} onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Perfil;
