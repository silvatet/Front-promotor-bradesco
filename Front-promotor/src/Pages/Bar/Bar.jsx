import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import "./Bar.css"; // Arquivo de estilos atualizado

const Bar = () => {
  const navigate = useNavigate();

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      sx={{ height: "100vh", width: "100vw", backgroundColor: "#f4f4f4", overflow: "hidden" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card className="bar-container" sx={{ maxWidth: 850, p: 6, borderRadius: 4, textAlign: "center" }}>
          <Typography variant="h3" className="bar-title" sx={{ fontWeight: "bold", mb: 2 }}>
            BAR
          </Typography>

          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              LEIA O CARTÃO
            </Typography>
            <Typography variant="h6" sx={{ color: "#00c6ff", fontWeight: "bold", mb: 3 }}>
              BAR
            </Typography>

            <div className="nfc-icon">
              <img src="/nfc-icon.png" alt="NFC" className="nfc-img" />
            </div>

            <Button 
              variant="contained"
              color="primary"
              fullWidth
              className="bar-button"
              onClick={() => navigate(-1)}
            >
              VOLTAR
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Bar;
