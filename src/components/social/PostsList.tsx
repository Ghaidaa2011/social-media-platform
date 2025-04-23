import { Stack } from "@mui/material";
import Post from "./Post";
import { IPost } from "../../types";
const PostsList = ({ records }: { records: IPost[] }) => {
  console.log("PostList");
  const postList = records.map((post) => <Post key={post.id} {...post} />);
  return <Stack>{postList}</Stack>;
};

export default PostsList;
