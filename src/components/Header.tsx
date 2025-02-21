import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tião Carreiro & Pardinho
                </Typography>
                <Button color="inherit" onClick={handleOpen}>Login</Button>
            </Toolbar>
            <LoginModal open={open} handleClose={handleClose} />
        </AppBar>
    );
};

export default Header;