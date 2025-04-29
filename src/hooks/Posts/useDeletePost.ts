import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import api from "../../services/axios-global"
import { IPost } from "../../types"
import { AxiosError } from "axios"
import { useAppSelector } from "../../store/hooks"

const deletePost = async (id: number, token?: string | null, signal?: AbortSignal): Promise<IPost> => {
  const { data } = await api.delete<IPost>(`/posts/${id}`,
    { headers: { Authorization: `Bearer ${token}` }, signal })
  return data
}
const useDeletePost = (): UseMutationResult<IPost, AxiosError, number> => {
  const { token } = useAppSelector((state) => state.authentication)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletePost(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "infinite"] })
      queryClient.invalidateQueries({ queryKey: ["user"], exact: false });
    }
  })

}
export default useDeletePost