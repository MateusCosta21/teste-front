import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <AppBar 
        position="static" 
        sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }} 
    >
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Tião Carreiro & Pardinho
                    </Typography>
                    <Button color="inherit" onClick={handleOpen}>Login</Button>
                </Toolbar>
            </Container>
            <LoginModal open={open} handleClose={handleClose} />
        </AppBar>
    );
};

export default Header;
