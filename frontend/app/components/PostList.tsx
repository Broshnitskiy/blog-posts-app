"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { getPosts } from "@/lib/api";
import useSWR from "swr";
import { Post } from "../../types";
import { getInitials } from "@/utils/getInitials";
import { getRandomColor } from "@/utils/getRandomColor";

const PostList = () => {
  const { data: posts, error, isLoading } = useSWR<Post[]>("/post", getPosts);

  if (isLoading)
    return (
      <Box sx={{ position: "fixed", top: "40%", left: "50%" }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography textAlign={"center"}>Error loading posts</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {posts && posts.length > 0
          ? posts.map((post, i) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      <span style={{ marginRight: "10px" }}>#{i + 1}</span>
                      {post.title}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ bgcolor: getRandomColor(), mr: 1 }}>
                        {getInitials(post.author)}
                      </Avatar>
                      <Typography variant="h6" component="p">
                        {post.author}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ marginTop: 2 }}
                    >
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

export default PostList;
