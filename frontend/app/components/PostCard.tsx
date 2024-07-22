import { Post } from "@/types";
import { getInitials } from "@/utils/getInitials";
import { getRandomColor } from "@/utils/getRandomColor";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard: FC<PostCardProps> = ({ post, index }) => {
  const router = useRouter();
  const { author, id, content, createdAt, title } = post;

  return (
    <Card
      onClick={() => router.push(`/${id}`)}
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.005)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          <span style={{ marginRight: "10px" }}>#{index}</span>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: getRandomColor(), mr: 1 }}>
            {getInitials(author)}
          </Avatar>
          <Typography variant="h6" component="p">
            {author}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
