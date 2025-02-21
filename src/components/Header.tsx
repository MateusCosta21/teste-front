import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<{ name: string, is_admin: boolean } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AppBar position="static" sx={{ width: '100%', overflowX: 'hidden' }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Top 5 Músicas
                    </Typography>

                    {user ? (
                        <>
                            {user.is_admin && (
                                <Button color="inherit">Sugestões</Button>
                            )}
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleOpen}>Login</Button>
                    )}
                </Toolbar>
            </Container>
            <LoginModal open={open} handleClose={handleClose} setUser={setUser} />
        </AppBar>
    );
};

export default Header;
