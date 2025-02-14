import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const ConfirmacaoPontos = () => {
  const navigate = useNavigate();

  // Simula um número aleatório de pontos ganhos
  const pontosGanhos = Math.floor(Math.random() * 100) + 10;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card
          sx={{
            maxWidth: 850, /* 🔥 Ajustado para proporção 10:16 */
            minHeight: "80vh", /* 🔹 Garante altura suficiente para centralização */
            width: "100%",
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: 3,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              🎉 Confirmação de Pontos 🎉
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#007BFF", mb: 3 }}>
              Você ganhou <strong>{pontosGanhos}</strong> pontos!
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontSize: 18, p: 2, borderRadius: 3 }}
                  onClick={() => navigate("/")}
                >
                  🏠 Voltar ao Início
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ fontSize: 18, p: 2, borderRadius: 3 }}
                  onClick={() => navigate("/setor")}
                >
                  🔄 Escolher Outro Setor
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ConfirmacaoPontos;
