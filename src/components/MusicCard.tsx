import React from "react";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

interface MusicCardProps {
  music: {
    id: number;
    titulo: string;
    youtube_id: string;
    visualizacoes: number;
    thumb: string;
  };
  rank: number;
  handleEdit: () => void; // ✅ Correção: Sem parâmetros aqui!
}

const MusicCard: React.FC<MusicCardProps> = ({ music, rank, handleEdit }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1e1e1e", color: "white" }}>
      <CardMedia component="img" height="140" image={music.thumb} alt={music.titulo} />
      <CardContent>
        <Typography variant="h6">
          #{rank} {music.titulo}
        </Typography>
        <Typography variant="body2">Visualizações: {music.visualizacoes}</Typography>
        <Button onClick={handleEdit} variant="contained" color="secondary" sx={{ marginTop: 2 }}>
          Editar
        </Button>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
