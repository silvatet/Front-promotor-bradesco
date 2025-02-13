import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import "./Setor.css";

const Setor = () => {
  const navigate = useNavigate();
  const [nfcCode, setNfcCode] = useState(""); // Armazena apenas o código mais recente

  // Simula a leitura de um código NFC
  const handleScan = () => {
    const newCode = `NFC-${Math.floor(Math.random() * 10000)}`; // Gera um ID aleatório
    setNfcCode(newCode); // Substitui o código anterior pelo novo
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        padding: 4,
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 4,
            padding: 4,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
              Escolha um Setor
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ fontSize: 20 }}
                onClick={() => navigate("/Bar")}
              >
                🍻 Bar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ fontSize: 20 }}
                onClick={() => navigate("/passe-cartao")}
              >
                🔄 Return de Machine
              </Button>

              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ fontSize: 20 }}
                onClick={() => navigate("/manutencaopontos")}
              >
                ⚙️ Manutenção de Pontos
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Registro de NFC
              </Typography>
              <Button
                variant="outlined"
                color="info"
                size="large"
                sx={{ fontSize: 18 }}
                onClick={handleScan}
              >
                📡 Simular Leitura NFC
              </Button>
              {nfcCode && (
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "black" }}>
                  Código NFC Atual: {nfcCode}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Setor;
