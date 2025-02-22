import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LoginModal from "./LoginModal";
import SuggestionModal from "./SuggestionModal"; 
import AdminRequestsModal from "./AdminRequestsModal";
import UrlModal from "./UrlModal";

interface HeaderProps {
  handleEditMusic: (musicId: number, youtube_id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleEditMusic }) => {
  const [open, setOpen] = useState(false);
  const [openSuggestionModal, setOpenSuggestionModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openUrlModal, setOpenUrlModal] = useState(false);  
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
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
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLogoutDialogOpen(false);
    window.location.reload(); // Recarrega a página após o logout
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleOpenSuggestionModal = () => setOpenSuggestionModal(true);
  const handleCloseSuggestionModal = () => setOpenSuggestionModal(false);

  const handleOpenAdminModal = () => setOpenAdminModal(true);
  const handleCloseAdminModal = () => setOpenAdminModal(false);

  const handleOpenUrlModal = () => setOpenUrlModal(true);
  const handleCloseUrlModal = () => setOpenUrlModal(false);

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
                <>
                  <Button color="inherit" onClick={handleOpenAdminModal}>
                    Solicitações
                  </Button>    
                  <Button color="inherit" onClick={handleOpenUrlModal}>
                    Adicionar URL
                  </Button>
                </>
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
      <UrlModal open={openUrlModal} handleClose={handleCloseUrlModal} />

      {/* Modal de confirmação de logout */}
      <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza de que deseja sair?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmLogout} color="error" autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
