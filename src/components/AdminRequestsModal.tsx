import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import api from "../services/api";

interface AdminRequestsModalProps {
  open: boolean;
  handleClose: () => void;
}

const AdminRequestsModal: React.FC<AdminRequestsModalProps> = ({ open, handleClose }) => {
  const [requests, setRequests] = useState<any[]>([]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await api.patch(`/sugestoes/${id}/status`, { status });
      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status } : request
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(`/sugestoes/lista-sugestoes`);
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
      <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: '8px' }}>
        <Typography variant="h6">Solicitações</Typography>
        {requests.length > 0 ? (
          <Table sx={{ backgroundColor: 'white' }}>
            <TableHead>
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Visualizações</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {request.thumb ? (
                      <img src={request.thumb} alt={request.titulo} style={{ width: '50px', height: '50px' }} />
                    ) : (
                      <Typography variant="body2">Sem imagem</Typography>
                    )}
                  </TableCell>
                  <TableCell>{request.titulo}</TableCell>
                  <TableCell>{request.visualizacoes}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="success"
                      sx={{ color: 'green' }}
                      onClick={() => handleStatusChange(request.id, 'approved')}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{ color: 'red' }}
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                    >
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body2" sx={{ color: 'black', textAlign: 'center', padding: 2 }}>
            Nenhuma solicitação encontrada.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AdminRequestsModal;
