import { Box, Skeleton, Stack } from "@mui/material";
import PostsSkeleton from "./PostsSkeleton";

const ProfileInfoSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "5px",
          boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.1)",
          padding: "8px 16px",
        }}
      >
        <Stack direction="row" justifyContent={"space-between"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Skeleton
              variant="circular"
              width={70}
              height={70}
              animation="wave"
            />
            <Box>
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: 300 }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: 300 }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: 300 }} />
            </Box>
          </Box>
        </Stack>
      </Box>
      <PostsSkeleton />
    </>
  );
};
export default ProfileInfoSkeleton;
