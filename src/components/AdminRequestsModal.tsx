import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import api from "../services/api";

interface AdminRequestsModalProps {
  open: boolean;
  handleClose: () => void;
}

const AdminRequestsModal: React.FC<AdminRequestsModalProps> = ({ open, handleClose }) => {
  const [requests, setRequests] = useState<any[]>([]); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/sugestoes/lista-sugestoes"); 
        if (Array.isArray(response.data.data)) { 
          setRequests(response.data.data); 
        } else {
          console.error("Dados não são um array:", response.data);
          setRequests([]); 
        }
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
        setRequests([]); 
      }
    };

    if (open) {
      fetchRequests();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Solicitações</Typography>
        {requests.length > 0 ? (
          <ul>
            {requests.map((request: any, index: number) => (
              <li key={request.id}>{request.titulo}</li> 
            ))}
          </ul>
        ) : (
          <Typography variant="body2">Nenhuma solicitação encontrada.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AdminRequestsModal;
