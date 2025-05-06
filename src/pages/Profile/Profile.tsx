import { Avatar, Box, Stack, Typography } from "@mui/material";
import useGetUserPosts from "@hooks/Users/useGetUserPosts";
import useGetUser from "@hooks/Users/useGetUser";
import { useParams } from "react-router";
import Post from "@components/social/Posts/Post";
import LoadingHandler from "@components/feedback/LoadingHandler/LoadingHandler";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

const Profile = () => {
  const paramId = useParams();
  const { data: user } = useGetUser(Number(paramId.id));
  const { data: posts, status, error } = useGetUserPosts(Number(paramId.id));
  const userPosts = posts
    ?.slice()
    .reverse()
    .map((post) => <Post key={post.id} {...post} />);
  return (
    <LoadingHandler status={status} type="profileInfo" error={error?.message}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.9)",
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
            <Avatar
              alt="Natacha"
              src={user?.profile_image as string}
              sx={{
                width: 64,
                height: 64,
                border: "3px solid lightGray",
              }}
            />
            <Box>
              <Typography variant="h5" color="initial" fontWeight={"bold"}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="gray">
                @{user?.username}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  maxWidth: {
                    xs: "150px",
                    sm: "250px",
                    md: "350px",
                    lg: "450px",
                  },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography variant="h6" color="initial">
                {user?.posts_count}
              </Typography>
              <Typography variant="caption" color="gray">
                posts
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography variant="h6" color="initial">
                {user?.comments_count}
              </Typography>
              <Typography variant="caption" color="gray">
                comments
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      {userPosts && userPosts.length > 0 ? (
        <>
          <Typography variant="body1" sx={{ marginY: "15px" }}>
            {user?.name}'s Posts
          </Typography>
          <Stack>{userPosts}</Stack>
        </>
      ) : (
        <LottieHandler
          type="empty"
          message="No posts yet. Let's share something!"
        />
      )}
    </LoadingHandler>
  );
};
export default Profile;
