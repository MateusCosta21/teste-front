import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import api from "../services/api";

interface EditMusicModalProps {
  open: boolean;
  handleClose: () => void;
  music: { id: number; youtube_id: string } | null;
}

const EditMusicModal: React.FC<EditMusicModalProps> = ({ open, handleClose, music }) => {
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (music) {
      setNewUrl(music.youtube_id); // Inicializa com o youtube_id
    }
  }, [music]);

  const handleUpdate = async () => {
    if (!music) return;
    try {
      // Alteração aqui: usa 'url' em vez de 'youtube_id'
      await api.put(`/musicas/${music.id}/update`, { url: newUrl });
      handleClose();
      window.location.reload(); // 🔄 Atualiza a página para refletir a alteração
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
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
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Editar Música</Typography>
        <TextField
          fullWidth
          label="Nova URL"  // Alterado para "Nova URL"
          margin="normal"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditMusicModal;
