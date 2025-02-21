import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

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

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
    const handleLogin = () => {
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={style}>
                <TextField fullWidth label="Email" margin="normal" />
                <TextField fullWidth label="Password" type="password" margin="normal" />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;