import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import api from "../services/api"; 
interface UrlModalProps {
  open: boolean;
  handleClose: () => void;
}

const UrlModal: React.FC<UrlModalProps> = ({ open, handleClose }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value); 
  };

  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await api.post("/musicas/salvar", { url }); 
      console.log("URL salva com sucesso:", response.data);
      setUrl(""); 
      handleClose(); 
    } catch (error) {
      console.error("Erro ao salvar URL:", error);
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
          Adicionar URL
        </Typography>
        <TextField
          fullWidth
          label="URL"
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
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UrlModal;
