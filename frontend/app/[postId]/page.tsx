"use client";

import { getPosts } from "@/lib/api";
import { Post } from "@/types";
import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Spinner from "@/app/components/Spinner";
import { getInitials } from "@/utils/getInitials";
import { getRandomColor } from "@/utils/getRandomColor";

const PostDetail = () => {
  const { postId } = useParams();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<Post>(`/post/${postId}`, getPosts);

  if (isLoading) return <Spinner />;

  if (error)
    return <Typography textAlign={"center"}>Error loading post</Typography>;

  return (
    post && (
      <Container>
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
      </Container>
    )
  );
};

export default PostDetail;
