import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface MusicCardProps {
    music: {
        titulo: string;
        youtube_id: string;
        visualizacoes: number;
        thumb: string;
    };
    rank: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ music, rank }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    #{rank} - {music.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {music.visualizacoes} visualizações
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="140"
                image={music.thumb}
                alt={music.titulo}
            />
        </Card>
    );
};

export default MusicCard;