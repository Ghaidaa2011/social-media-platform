import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import api from "@services/axios-global"
import { type IPost } from "@/types";
interface PostsResponse {
  data: IPost[];
  meta: {
    current_page: number;
    last_page: number;
  }
}
const getPosts = async ({ pageParam }: QueryFunctionContext): Promise<PostsResponse> => {
  const { data } = await api.get<PostsResponse>(`/posts?limit=10&page=${pageParam}`);
  return data
}
const useInfinitePosts = () => {
  return useInfiniteQuery<PostsResponse, Error>({
    refetchOnWindowFocus: false,
    queryKey: ["posts", "infinite"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (pageParam) => {
      const { meta } = pageParam
      return meta.current_page < meta.last_page ? meta.current_page + 1 : undefined
    }
  })
}
export default useInfinitePosts