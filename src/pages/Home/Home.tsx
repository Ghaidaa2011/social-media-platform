import { Box, CircularProgress } from "@mui/material";
import PostsList from "../../components/social/PostsList";
import usePosts from "./usePosts";
const Home = () => {
  console.log("Home");
  const { records, loading } = usePosts();
  return (
    <>
      {loading === "pending" ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="error" />
        </Box>
      ) : (
        <PostsList records={records} />
      )}
    </>
  );
};
export default Home;
