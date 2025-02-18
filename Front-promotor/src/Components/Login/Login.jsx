import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Checkbox, FormControlLabel, Grid, Card, CardContent, Typography } from "@mui/material";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://18.231.158.211:3335/Organizer/Login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpar erro anterior

    try {
      const loginData = {
        Login: username.trim(),
        SecretKey: password.trim(),
      };

      console.log("🔹 Enviando dados para API:", loginData);

      const response = await axios.put(API_URL, loginData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("🔹 Resposta da API:", response.data);

      // Verifica se há organizadores na resposta e pega o primeiro
      if (response.status === 200 && response.data.Organizers?.length > 0) {
        const usuarioAutenticado = response.data.Organizers[0]; // Pega o primeiro usuário

        console.log("✅ Usuário autenticado:", usuarioAutenticado);

        alert(`✅ Login autorizado, ${usuarioAutenticado.OrganizerName}!`);
        navigate("/setor"); // Redireciona para a tela Setor
      } else {
        setError("❌ Usuário ou senha inválidos!");
      }
    } catch (error) {
      console.error("❌ Erro na requisição:", error);

      if (error.response) {
        setError(`Erro: ${error.response.data?.message || "Falha ao autenticar"}`);
      } else {
        setError("Erro ao conectar ao servidor. Verifique a conexão.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", backgroundColor: "#f0f0f0", overflow: "hidden" }}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <Card className="carteirinha-container" sx={{ maxWidth: 600, width: "100%", p: 4, borderRadius: 4, textAlign: "center", overflow: "hidden" }}>
          <CardContent>
            <Typography variant="h5" className="carteirinha-title" sx={{ fontWeight: "bold", mb: 2 }}>
              Login do Promotor
            </Typography>
            {error && <Typography color="error" sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}>{error}</Typography>}
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

              <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3, p: 2, fontSize: 18, borderRadius: 3 }}>
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
