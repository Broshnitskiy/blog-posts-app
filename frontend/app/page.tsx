"use client";

import { useState } from "react";
import PostList from "./components/PostList";
import { useSWRConfig } from "swr";
import { Box, Button, Container, Typography } from "@mui/material";
import CustomModal from "./components/CustomModal";
import Form from "./components/Form";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
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

        <Box textAlign={"center"}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create New Post
          </Button>
        </Box>

        <CustomModal open={open} handleClose={handleClose}>
          <Form title="Create New Post" handleClose={handleClose} />
        </CustomModal>

        <PostList />
      </Container>
    </main>
  );
}
