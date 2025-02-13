import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, Grid, Card, CardContent, Typography } from "@mui/material";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("teste", username, password);
    alert("Enviando os dados: " + username + " - " + password);
    navigate("/setor");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
              Login do Promotor
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuário"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Senha"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />

              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                <FormControlLabel control={<Checkbox />} label="Lembre de mim" />
                <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                  Esqueceu a senha?
                </Typography>
              </Grid>

              <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3, p: 2 }}>
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
