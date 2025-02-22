import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import api from "../services/api";

interface DeleteMusicModalProps {
  open: boolean;
  handleClose: () => void;
  musicId: number | null;
  handleDeleteConfirm: (id: number) => void;
}

const DeleteMusicModal: React.FC<DeleteMusicModalProps> = ({
  open,
  handleClose,
  musicId,
  handleDeleteConfirm,
}) => {
  const handleDelete = async () => {
    if (musicId === null) return;

    try {
      await api.delete(`/musicas/${musicId}/delete`);
      handleDeleteConfirm(musicId); // Atualiza o estado na tela para refletir a remoção
      handleClose();
    } catch (error) {
      console.error("Erro ao excluir música:", error);
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
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Tem certeza que deseja excluir esta música?
        </Typography>
        <Box display="flex" gap={2}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Deletar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteMusicModal;
