import { useQuery } from "@tanstack/react-query";
import api from "../services/axios-global"
import { IPost } from "../types";
interface PostsResponse {
  data: IPost[];
}
const getPosts = async (): Promise<IPost[]> => {
  const postsResponse = await api.get<PostsResponse>("/posts?limit=100&page=1");
  return postsResponse.data.data
}
const useGetPosts = () => {
  return useQuery<IPost[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 3 * 1000
    // retry: 2, // Retry failed requests twice
  })
}
export default useGetPosts