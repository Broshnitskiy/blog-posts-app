"use client";

import { getPosts } from "@/lib/api";
import { Post } from "@/types";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Spinner from "@/app/components/Spinner";

const PostDetail = () => {
  const { postId } = useParams();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR<Post>(`/post/${postId}`, getPosts);

  console.log(post);

  if (isLoading) return <Spinner />;

  if (error)
    return <Typography textAlign={"center"}>Error loading post</Typography>;

  return (
    <>
      <h1>{postId}</h1>
      <p>{postId}</p>
    </>
  );
};

export default PostDetail;
