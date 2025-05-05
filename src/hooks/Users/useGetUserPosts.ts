import { useQuery } from "@tanstack/react-query";
import api from "../../services/axios-global"
import { type IPost } from "../../types";
interface PostsResponse {
  data: IPost[];
}
const getUserPosts = async (id: number, signal?: AbortSignal): Promise<IPost[]> => {
  const postsResponse = await api.get<PostsResponse>(`/users/${id}/posts`, { signal });
  return postsResponse.data.data
}
const useGetUserPosts = (id: number) => {
  return useQuery<IPost[], Error>({
    queryKey: ["user", "posts", id],
    queryFn: ({ signal }) => getUserPosts(id, signal),
    refetchOnWindowFocus: false,
  })
}
export default useGetUserPosts