"use client";

import { useState } from "react";
import PostList from "./components/PostList";
import { Box, Button, Container, Typography } from "@mui/material";
import CustomModal from "./components/CustomModal";
import Form from "./components/Form";
import { createPost } from "@/lib/api";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <main>
      <Container>
        <Typography
          variant="h4"
          component="h1"
          textAlign={"center"}
          sx={{ mb: 2, pt: 2 }}
        >
          Post List
        </Typography>

        <Box textAlign={"center"} sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create New Post
          </Button>
        </Box>

        <CustomModal open={openModal} handleClose={handleClose}>
          <Form
            title="Create New Post"
            handleClose={handleClose}
            createPost={createPost}
          />
        </CustomModal>

        <PostList />
      </Container>
    </main>
  );
}
