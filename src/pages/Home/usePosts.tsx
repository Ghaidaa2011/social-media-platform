import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actGetPosts } from "../../store/posts/postsSlice";
const usePosts = () => {
  const dispatch = useAppDispatch();
  const { records, loading } = useAppSelector((state) => state.posts);
  useEffect(() => {
    const promise = dispatch(actGetPosts());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return { records, loading };
};
export default usePosts;
