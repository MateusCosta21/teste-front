import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
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

  useEffect(() => {
    api.get("/musicas").then((response) => {
      setMusics(response.data.data);
    });
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

      <Grid container spacing={2} justifyContent="center" sx={{ width: "100%" }}>
        {currentMusic.map((music, index) => (
          <Grid item xs={12} sm={6} md={4} key={music.id}>
            <MusicCard
              music={music}
              rank={index + 1 + (page - 1) * musicPerPage}
              handleEdit={() => handleOpenEditModal(music.id, music.youtube_id)}
              handleDelete={() => handleOpenDeleteModal(music.id)}
            />
          </Grid>
        ))}
      </Grid>

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
