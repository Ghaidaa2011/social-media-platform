import { useQuery } from "@tanstack/react-query";
import api from "../services/axios-global"
import { IPost } from "../types";

interface responseType {
  data: IPost
}
const getPostInfo = async (id: number, signal?: AbortSignal): Promise<IPost> => {
  const { data } = await api.get<responseType>(`/posts/${id}`, { signal });
  return data.data
}

const useGetPostInfo = (id: number) => {
  return useQuery<IPost, Error>({
    queryKey: ["posts", "info", id],
    queryFn: ({ signal }) => getPostInfo(id, signal),
    enabled: !!id,
  })
}
export default useGetPostInfo