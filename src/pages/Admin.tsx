import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MusicCard from '../components/MusicCard';

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
        <div>
            <h5>Top 5 Músicas Mais Tocadas</h5>
            {musics.map((music, index) => (
                <MusicCard key={music.id} music={music} rank={index + 1} />
            ))}
        </div>
    );
};

export default Home;