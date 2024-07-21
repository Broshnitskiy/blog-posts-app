import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const PostDetail = () => {
  const { postId } = useParams();
  const router = useRouter();

  return (
    <>
      <h1>{postId}</h1>
      <p>{postId}</p>
    </>
  );
};

export default PostDetail;
