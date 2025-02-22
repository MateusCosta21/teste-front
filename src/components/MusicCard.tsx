import React from "react";
import { Card, CardContent, Button, Typography, Box, CardMedia } from "@mui/material";

interface MusicCardProps {
  music: { 
    id: number; 
    youtube_id: string; 
    titulo: string; 
    visualizacoes: number; 
    thumb: string; 
  };
  rank: number;
  handleEdit: () => void;
  handleDelete: () => void;
  isAdmin: boolean; // Novo parâmetro
}

const MusicCard: React.FC<MusicCardProps> = ({ music, rank, handleEdit, handleDelete, isAdmin }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1c1c1c", color: "white" }}>
      <CardMedia
        component="img"
        height="140"
        image={music.thumb}
        alt={music.titulo}
      />
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {rank}. {music.titulo}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Visualizações: {music.visualizacoes}
        </Typography>

        {isAdmin && ( // Exibe os botões apenas se o usuário for admin
          <Box display="flex" gap={2}>
            <Button
              onClick={handleEdit}
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Editar
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              sx={{ width: "100%" }}
            >
              Deletar
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicCard;
