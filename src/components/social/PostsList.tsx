import { Box, CircularProgress, Stack } from "@mui/material";
import Post from "./Post";
import { IPost, TLoading } from "../../types";
import { memo } from "react";

const PostsList = memo(
  ({ records, loading }: { records: IPost[]; loading: TLoading }) => {
    console.log("PostList");
    const postList = records.map((post) => <Post key={post.id} {...post} />);
    return (
      <Stack>
        {loading === "pending" ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="error" />
          </Box>
        ) : (
          postList
        )}
      </Stack>
    );
  }
);

export default PostsList;
