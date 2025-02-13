import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import "./PasseCartao.css";

const PasseCartao = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card
          className="cartao-container"
          sx={{
            maxWidth: 600,
            width: "100%",
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h4" className="cartao-title" sx={{ fontWeight: "bold", mb: 2 }}>
              Passe o Cartão
            </Typography>
            <Typography variant="h6" sx={{ color: "#555", mb: 3 }}>
              Aproxime seu cartão para continuar.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/proxima-tela")}
                  sx={{ backgroundColor: "#007BFF", fontSize: 18, py: 2, borderRadius: 3 }}
                >
                  ➡️ Próximo
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/confirmacao-pontos")}
                  sx={{ backgroundColor: "#28A745", fontSize: 18, py: 2, borderRadius: 3 }}
                >
                  ✅ Confirmar Pontos
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PasseCartao;
