import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Grid } from "@mui/material";
import "./Manutencaopontos.css"; // Arquivo de estilo atualizado

const Manutencaopontos = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(15px)",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
      <Box
        className="manutencao-container"
        sx={{
          maxWidth: 1000,
          width: "100%",
          p: 6,
          borderRadius: 4,
          textAlign: "center",
           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",  
       }}
      >

          <Typography variant="h3" className="manutencao-title" sx={{ fontWeight: "bold", mb: 3 }}>
            Manutenção de Pontos
          </Typography>

          <Box className="vertical-form">
            <Typography variant="h4" className="scan-text" sx={{ color: "#007BFF", mb: 3 }}>
              Leia o Cartão
            </Typography>

            <Box className="nfc-icon" sx={{ mb: 4 }}>
              <img src="/nfc-icon.png" alt="NFC" className="nfc-img" />
            </Box>

            <Button
              variant="contained"
              className="manutencao-button"
              onClick={() => navigate("/setor")}
            >
              Voltar
            </Button>
          </Box>

          <Typography className="footer-text">
            HOLDING CLUBE
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Manutencaopontos;
