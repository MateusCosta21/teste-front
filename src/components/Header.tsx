import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import LoginModal from "./LoginModal";
import SuggestionModal from "./SuggestionModal"; 
import AdminRequestsModal from "./AdminRequestsModal";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openSuggestionModal, setOpenSuggestionModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [user, setUser] = useState<{ name: string; is_admin: boolean } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleOpenSuggestionModal = () => setOpenSuggestionModal(true);
  const handleCloseSuggestionModal = () => setOpenSuggestionModal(false);

  const handleOpenAdminModal = () => setOpenAdminModal(true);
  const handleCloseAdminModal = () => setOpenAdminModal(false);

  return (
    <AppBar position="static" sx={{ width: "100%", overflowX: "hidden" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Top 5 Músicas
          </Typography>

          {user ? (
            <>
              {user.is_admin && (
                <Button color="inherit" onClick={handleOpenAdminModal}>
                  Solicitações
                </Button>
              )}
              <Button color="inherit" onClick={handleOpenSuggestionModal}>
                Sugestões
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleOpen}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>

      <LoginModal open={open} handleClose={handleClose} setUser={setUser} />
      <SuggestionModal open={openSuggestionModal} handleClose={handleCloseSuggestionModal} />
      <AdminRequestsModal open={openAdminModal} handleClose={handleCloseAdminModal} />
    </AppBar>
  );
};

export default Header;
