import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MusicCard from '../components/MusicCard';
import { Box, Typography } from '@mui/material';

interface Music {
    id: number;
    titulo: string;
    youtube_id: string;
    visualizacoes: number;
    thumb: string;
}

const Home: React.FC = () => {
    const [musics, setMusics] = useState<Music[]>([]);

    useEffect(() => {
        api.get('/musicas').then(response => {
            setMusics(response.data.data);
        });
    }, []);

    return (
        <Box 
            sx={{
                backgroundColor: '#121212', 
                minHeight: '100vh', 
                width: '100vw', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', 
                padding: 4
            }}
        >
            <Typography variant="h4" sx={{ color: 'white', marginBottom: 3, fontWeight: 'bold' }}>
                Top 5 Músicas Mais Tocadas
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 500 }}>
                {musics.map((music, index) => (
                    <MusicCard key={music.id} music={music} rank={index + 1} />
                ))}
            </Box>
        </Box>
    );
};

export default Home;
