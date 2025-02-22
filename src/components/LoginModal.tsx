import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import api from "../services/api";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
  setUser: (user: { name: string; is_admin: boolean }) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 

  const handleLogin = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await api.post("/login", { email, password });
      const userData = response.data.user;
      const roles = response.data.roles;
      const isAdmin = roles.includes("admin");

      const user = {
        name: userData.name,
        is_admin: isAdmin,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.access_token); 
      setUser(user); 
      handleClose();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Login
        </Typography>

        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading} 
        >
          {loading ? "Entrando..." : "Login"}
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
