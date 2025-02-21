import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Sugestao {
    id: number;
    titulo: string;
    youtube_id: string;
    status: string;
}

const Admin: React.FC = () => {
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

    useEffect(() => {
        api.get('/sugestoes').then(response => {
            setSugestoes(response.data);
        });
    }, []);

    const handleAprovar = (id: number) => {
        api.patch(`/sugestoes/${id}/status`, { status: 'aprovado' }).then(() => {
            setSugestoes(sugestoes.filter(sugestao => sugestao.id !== id));
        });
    };

    const handleRejeitar = (id: number) => {
        api.patch(`/sugestoes/${id}/status`, { status: 'rejeitado' }).then(() => {
            setSugestoes(sugestoes.filter(sugestao => sugestao.id !== id));
        });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Painel de Administração
            </Typography>
            <Typography variant="h5" gutterBottom>
                Sugestões Pendentes
            </Typography>
            {sugestoes.length === 0 ? (
                <Typography variant="body1">Nenhuma sugestão pendente.</Typography>
            ) : (
                <List>
                    {sugestoes.map(sugestao => (
                        <Card key={sugestao.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{sugestao.titulo}</Typography>
                                <Typography variant="body2">ID do YouTube: {sugestao.youtube_id}</Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ marginRight: 1 }}
                                    onClick={() => handleAprovar(sugestao.id)}
                                >
                                    Aprovar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleRejeitar(sugestao.id)}
                                >
                                    Rejeitar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            )}
        </div>
    );
};

export default Admin;