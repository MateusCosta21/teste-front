import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import api from "../services/api";

interface SuggestionModalProps {
  open: boolean;
  handleClose: () => void;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ open, handleClose }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value); 
  };

  const handleSubmit = async () => {
    if (!url) return; 

    setLoading(true);
    try {
      const response = await api.post("/sugestoes", { url });
      console.log("Sugestão enviada:", response.data);
      setUrl(""); 
      handleClose(); 
    } catch (error) {
      console.error("Erro ao enviar sugestão:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cadastre sua sugestão
        </Typography>
        <TextField
          fullWidth
          label="URL da sugestão" 
          value={url} 
          onChange={handleChange} 
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default SuggestionModal;
