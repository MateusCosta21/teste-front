import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import api from '../services/api';

interface Suggestion {
    id: number;
    title: string;
}

const SuggestionList: React.FC = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        api.get('/sugestoes').then(response => {
            setSuggestions(response.data);
        });
    }, []);

    const handleApprove = async (id: number) => {
        await api.post(`/sugestoes/${id}/aprovar`);
        setSuggestions(suggestions.filter(s => s.id !== id));
    };

    const handleReject = async (id: number) => {
        await api.post(`/sugestoes/${id}/rejeitar`);
        setSuggestions(suggestions.filter(s => s.id !== id));
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">Sugestões</Typography>
            {suggestions.map(suggestion => (
                <Card key={suggestion.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography>{suggestion.title}</Typography>
                        <Button onClick={() => handleApprove(suggestion.id)}>Aceitar</Button>
                        <Button onClick={() => handleReject(suggestion.id)}>Recusar</Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default SuggestionList;
