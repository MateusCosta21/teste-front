import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { Box } from '@mui/material';

const App: React.FC = () => {
    return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </Box>
    );
};

export default App;
