import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import api from '../services/api';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
    setUser: (user: { name: string, is_admin: boolean }) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, password });
            const userData = response.data.user;

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            handleClose();
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <TextField 
                    fullWidth 
                    label="Email" 
                    margin="normal" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    fullWidth 
                    label="Senha" 
                    type="password" 
                    margin="normal" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;
