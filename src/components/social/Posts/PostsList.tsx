import { Box, Stack } from "@mui/material";
import Post from "./Post";
import useInfinitePosts from "@hooks/Posts/useInfinitePosts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { type IPost } from "@/types";
import { Spinner, LoadingHandler } from "@components/feedback";

const PostsList = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const postList = posts.map((post: IPost) => <Post key={post.id} {...post} />);
  return (
    <Stack>
      <LoadingHandler status={status} type="posts">
        {postList}
        <Box
          ref={ref}
          sx={{ display: "flex", justifyContent: "center", my: 1 }}
        >
          {isFetchingNextPage && hasNextPage && <Spinner />}
        </Box>
      </LoadingHandler>
    </Stack>
  );
};
export default PostsList;
