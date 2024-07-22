"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getPosts } from "@/lib/api";
import useSWR from "swr";
import { Post } from "../../types";
import PostCard from "./PostCard";
import Spinner from "@/app/components/Spinner";

const PostList = () => {
  const { data: posts, error, isLoading } = useSWR<Post[]>("/post", getPosts);

  if (isLoading) return <Spinner />;

  if (error)
    return <Typography textAlign={"center"}>Error loading posts</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {posts && posts.length > 0
          ? posts.map((post, i) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard post={post} index={i + 1} />
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

export default PostList;
