import { Post } from "@/types";
import { Box, Button } from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface CardBtns {
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
  post: Post;
}

const CardBtns: FC<CardBtns> = ({ handleDelete, handleEdit, post }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(post);
        }}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(post);
        }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default CardBtns;
