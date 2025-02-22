import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EditMusicModal from './components/EditMusicModal';
import { Box } from '@mui/material';

const App: React.FC = () => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingMusic, setEditingMusic] = useState<{ id: number; youtube_id: string } | null>(null); // 

    const handleEditMusic = (musicId: number, youtube_id: string) => {
        setEditingMusic({ id: musicId, youtube_id }); // 
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setEditingMusic(null);
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
            <Router>
                <Header handleEditMusic={handleEditMusic} /> {}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>

      
            {editingMusic && (
                <EditMusicModal 
                    open={openEditModal} 
                    handleClose={handleCloseEditModal} 
                    music={editingMusic} 
                />
            )}
        </Box>
    );
};

export default App;
