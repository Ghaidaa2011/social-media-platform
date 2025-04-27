import { useQuery } from "@tanstack/react-query";
import api from "../services/axios-global"
import { IPost } from "../types";
interface PostsResponse {
  data: IPost[];
}
const getPosts = async (signal?: AbortSignal): Promise<IPost[]> => {
  const postsResponse = await api.get<PostsResponse>("/posts?limit=100&page=1", { signal });
  return postsResponse.data.data
}
const useGetPosts = () => {
  return useQuery<IPost[], Error>({
    queryKey: ["posts"],
    queryFn: ({ signal }) => getPosts(signal),
    staleTime: 3 * 1000
  })
}
export default useGetPosts