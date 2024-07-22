"use client";

import { deletePost, getPosts, updatePost } from "@/lib/api";
import { Post } from "@/types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Spinner from "@/app/components/Spinner";
import { getInitials } from "@/utils/getInitials";
import { getRandomColor } from "@/utils/getRandomColor";
import CardBtns from "../components/CardBtns";
import CustomModal from "../components/CustomModal";
import Form from "../components/Form";
import { useState } from "react";
import toast from "react-hot-toast";

const PostDetail = () => {
  const { postId } = useParams();
  const router = useRouter();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<Post>(`/post/${postId}`, getPosts);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditOpen = () => {
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleDeleteOpen = (post: Post) => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const onDeletePost = async () => {
    try {
      if (!post) return;

      await deletePost(post?.id);
      toast.success("Deleted");
      handleDeleteClose();
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something wrong! Please, try later.");
    }
  };

  if (isLoading) return <Spinner />;

  if (error)
    return <Typography textAlign={"center"}>Error loading post</Typography>;

  return (
    post && (
      <Container maxWidth={"sm"}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: getRandomColor(), mr: 2 }}>
              {getInitials(post.author)}
            </Avatar>
            <Typography variant="h6" component="p">
              {post.author}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        </Box>

        <CardBtns
          handleEdit={handleEditOpen}
          handleDelete={handleDeleteOpen}
          post={post}
        />

        {/* modal for editing */}
        <CustomModal open={openEditModal} handleClose={handleEditClose}>
          <Form
            title="Update Post"
            handleClose={handleEditClose}
            updatePost={updatePost}
            chosenPost={post}
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
      </Container>
    )
  );
};

export default PostDetail;
