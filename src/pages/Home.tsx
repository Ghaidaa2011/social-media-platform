import { useEffect } from "react";
import PostsList from "../components/social/PostsList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetPosts } from "../store/posts/postsSlice";

const Home = () => {
  console.log("Home");
  const dispatch = useAppDispatch();
  const { records, loading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    const promise = dispatch(actGetPosts());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return <PostsList records={records} loading={loading} />;
};
export default Home;
