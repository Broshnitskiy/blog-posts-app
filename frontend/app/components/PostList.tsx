"use client";

import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { deletePost, getPosts, updatePost } from "@/lib/api";
import useSWR from "swr";
import { Post } from "@/types/index";
import PostCard from "./PostCard";
import Spinner from "@/app/components/Spinner";
import CustomModal from "./CustomModal";
import Form from "./Form";
import toast from "react-hot-toast";

const PostList = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);

  const { data: posts, error, isLoading } = useSWR<Post[]>("/post", getPosts);

  const handleEditOpen = (post: Post) => {
    setChosenPost(post);
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setChosenPost(null);
  };

  const handleDeleteOpen = (post: Post) => {
    setChosenPost(post);
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
    setChosenPost(null);
  };

  const onDeletePost = async () => {
    try {
      if (!openDeleteModal || !chosenPost) return;

      await deletePost(chosenPost?.id);
      toast.success("Deleted");
      handleDeleteClose();
    } catch (err) {
      console.error(err);
      toast.error("Something wrong! Please, try later.");
    }
  };

  if (isLoading) return <Spinner />;

  if (error)
    return <Typography textAlign={"center"}>Error loading posts</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {posts && posts.length > 0
          ? posts.map((post, i) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard
                  post={post}
                  index={i + 1}
                  handleDelete={handleDeleteOpen}
                  handleEdit={handleEditOpen}
                />
              </Grid>
            ))
          : null}
      </Grid>

      {/* modal for editing */}
      <CustomModal open={openEditModal} handleClose={handleEditClose}>
        <Form
          title="Update Post"
          handleClose={handleEditClose}
          updatePost={updatePost}
          chosenPost={chosenPost}
        />
      </CustomModal>

      {/* modal for deleting */}
      <CustomModal open={openDeleteModal} handleClose={handleDeleteClose}>
        <Box textAlign={"center"}>
          <h2>Are you sure?</h2>

          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="outlined" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={onDeletePost}>
              Yes
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default PostList;
