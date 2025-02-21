import React from 'react';
import { Card, Typography, CardMedia, Box } from '@mui/material';

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
        <Card sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2, 
            borderRadius: 2, 
            boxShadow: 3,
            transition: 'transform 0.2s',
            backgroundColor: '#1e1e1e',
            color: 'white',
            '&:hover': {
                transform: 'scale(1.02)',
            },
        }}>
          
            <CardMedia
                component="img"
                sx={{ 
                    width: 150, 
                    height: 150, 
                    objectFit: 'cover', 
                    borderRadius: '8px 0 0 8px',
                }}
                image={music.thumb}
                alt={music.titulo}
            />

        
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexGrow: 1, 
                padding: 2,
                textAlign: 'center' 
            }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    #{rank} - {music.titulo}
                </Typography>
                <Typography variant="body2" color="gray" sx={{ marginTop: 1 }}>
                    {music.visualizacoes.toLocaleString()} visualizações
                </Typography>
            </Box>
        </Card>
    );
};

export default MusicCard;
