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
  handleEdit?: () => void;
  handleDelete?: () => void;
  isAdmin?: boolean; 
}

const MusicCard: React.FC<MusicCardProps> = ({ music, rank, handleEdit, handleDelete, isAdmin }) => {

  // Função para redirecionar ao clicar na música
  const handleMusicClick = () => {
    window.open(`https://www.youtube.com/watch?v=${music.youtube_id}`, "_blank");
  };

  return (
    <Card
      sx={{
        width: 250,
        backgroundColor: "#1c1c1c",
        color: "white",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer", // Para indicar que o card é clicável
      }}
      onClick={handleMusicClick} // Adicionando o manipulador de clique
    >
      <CardMedia
        component="img"
        height="140"
        image={music.thumb}
        alt={music.titulo}
      />
      <CardContent sx={{ padding: "10px", "&:last-child": { paddingBottom: "10px" } }}>
        <Typography variant="h6" sx={{ marginBottom: "4px", fontSize: "16px", fontWeight: "bold" }}>
          {rank}. {music.titulo}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "14px", opacity: 0.8 }}>
          Visualizações: {music.visualizacoes}
        </Typography>

        {isAdmin && (
          <Box display="flex" gap={1}>
            <Button
              onClick={handleEdit}
              variant="contained"
              color="primary"
              sx={{ flex: 1, minWidth: "0px", padding: "5px 8px", fontSize: "12px" }}
            >
              Editar
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              sx={{ flex: 1, minWidth: "0px", padding: "5px 8px", fontSize: "12px" }}
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
