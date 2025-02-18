import React, { useState, useEffect } from "react";
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

  const buscarCarteira = async () => {
    if (!cpfUsuario) {
      setErroAPI("Insira um CPF válido para buscar o saldo.");
      return;
    }

    try {
      console.log("🔹 Buscando carteira do usuário:", cpfUsuario);

      const response = await axios.get(API_URL, {
        headers: { Cpf: cpfUsuario },
        timeout: 10000,
      });

      console.log("🔹 Resposta da API:", response.data);

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Resposta inválida da API");
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

      const totalSaldo = transacoesFormatadas.length > 0 ? transacoesFormatadas[transacoesFormatadas.length - 1].pontosTotal : 0;
      setSaldoAtual(totalSaldo);
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
        Cpf: cpfUsuario,
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

            {!erroAPI && saldoAtual !== 0 && (
              <>
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
                      {transacoes.map((transacao, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: 16 }}>{transacao.origem}</TableCell>
                          <TableCell sx={{ fontSize: 16, fontWeight: "bold", color: transacao.pontos >= 0 ? "green" : "red" }}>
                            {transacao.pontos}
                          </TableCell>
                          <TableCell sx={{ fontSize: 16, fontWeight: "bold" }}>{transacao.pontosTotal}</TableCell>
                          <TableCell sx={{ fontSize: 16 }}>{transacao.horario}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TextField
                  fullWidth
                  label="Alterar Pontos"
                  variant="outlined"
                  value={pontosAlteracao}
                  onChange={(e) => setPontosAlteracao(e.target.value)}
                  margin="normal"
                  sx={{ mt: 2 }}
                />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="success" onClick={() => alterarPontos("add")}>
                      Adicionar Pontos
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="error" onClick={() => alterarPontos("remove")}>
                      Remover Pontos
                    </Button>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  className="saldo-btn"
                  sx={{ mt: 3, height: 60, backgroundColor: "#007BFF", fontSize: 20, fontWeight: "bold", borderRadius: 3 }}
                >
                  Saldo atual: {saldoAtual}
                </Button>
              </>
            )}

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
