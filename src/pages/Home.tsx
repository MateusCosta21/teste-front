import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import api from "../services/api";
import MusicCard from "../components/MusicCard";
import EditMusicModal from "../components/EditMusicModal";
import DeleteMusicModal from "../components/DeleteMusicModal";

interface Music {
  id: number;
  youtube_id: string;
  titulo: string;
  visualizacoes: number;
  thumb: string;
}

const Home: React.FC = () => {
  const [musics, setMusics] = useState<Music[]>([]);
  const [page, setPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<{ id: number; youtube_id: string } | null>(null);
  const [user, setUser] = useState<{ name: string; is_admin: boolean } | null>(null);

  useEffect(() => {
    // Buscar músicas da API
    api.get("/musicas").then((response) => {
      setMusics(response.data.data);
    });

    // Verificar se há usuário logado no localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const musicPerPage = 5;
  const currentMusic = musics.slice((page - 1) * musicPerPage, page * musicPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenEditModal = (musicId: number, youtubeId: string) => {
    setSelectedMusic({ id: musicId, youtube_id: youtubeId });
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (musicId: number) => {
    setSelectedMusic({ id: musicId, youtube_id: "" });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (id: number) => {
    setMusics(musics.filter((music) => music.id !== id));
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          marginBottom: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Top 5 Músicas Mais Tocadas
      </Typography>

      {/* Container flexível para alinhar os cards na mesma linha */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2} // Define espaçamento entre os cards
        justifyContent="center" // Centraliza os cards na tela
        sx={{ width: "100%" }}
      >
        {currentMusic.map((music, index) => (
          <MusicCard
            key={music.id}
            music={music}
            rank={index + 1 + (page - 1) * musicPerPage}
            handleEdit={() => handleOpenEditModal(music.id, music.youtube_id)}
            handleDelete={() => handleOpenDeleteModal(music.id)}
            isAdmin={user?.is_admin || false} // Passando a informação de admin
          />
        ))}
      </Box>

      <Pagination
        count={Math.ceil(musics.length / musicPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "white",
            color: "#121212",
          },
        }}
      />

      <EditMusicModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        music={selectedMusic}
      />
      <DeleteMusicModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        musicId={selectedMusic?.id || null}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default Home;
