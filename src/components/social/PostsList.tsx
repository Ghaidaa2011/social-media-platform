import { Box, CircularProgress, Stack } from "@mui/material";
import Post from "./Post";
import useInfinitePosts from "../../hooks/useInfinitePosts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { IPost } from "../../types";

const PostsList = () => {
  console.log("PostList");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }
  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const postList = posts.map((post: IPost) => <Post key={post.id} {...post} />);
  return (
    <Stack>
      {postList}
      <Box ref={ref} sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        {isFetchingNextPage && hasNextPage && (
          <CircularProgress color="error" />
        )}
      </Box>
    </Stack>
  );
};
export default PostsList;
