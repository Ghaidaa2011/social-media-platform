import { Skeleton, Stack } from "@mui/material";

const PostsSkeleton = () => {
  return (
    <Stack
      direction="column"
      gap={3}
      justifyContent={"center"}
      alignItems={"center"}
      marginY={5}
    >
      <Skeleton variant="rounded" width={400} height={120} />
      <Skeleton variant="rounded" width={400} height={120} />
      <Skeleton variant="rounded" width={400} height={120} />
    </Stack>
  );
};
export default PostsSkeleton;
