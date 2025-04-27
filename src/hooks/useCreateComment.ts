import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../services/axios-global";
import { IComment, IPost } from "../types/posts.types";
import { AxiosError } from "axios";
import { useAppSelector } from "../store/hooks";

type IData = {
  id: number;
  comment: string;
};
type TResponse = {
  data: { comment: IComment }
};
const createComment = async ({ id, comment }: IData, token?: string | null, signal?: AbortSignal): Promise<IComment> => {
  const { data } = await api.post<TResponse>(`/posts/${id}/comments`, { body: comment }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    signal
  })
  return data.data.comment
}
const useCreateComment = (): UseMutationResult<IComment, AxiosError, IData> => {
  const { token, user } = useAppSelector(state => state.authentication)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }) => createComment({ id, comment }, token),

    onMutate: ({ id, comment }: IData) => {
      const previousPost = queryClient.getQueryData<IPost>(["posts", "info", id],)
      if (previousPost && user) {
        const newComment: IComment = {
          id: Date.now(), // Temporary id
          body: comment,
          author: {
            name: user?.name,
            profile_image: user?.profile_image as string,
          },
        };
        queryClient.setQueryData(["posts", "info", id], (post: IPost) => {
          return { ...post, comments: [...(post.comments || []), newComment] }
        })
      }

      return () => {
        queryClient.setQueryData(["posts", "info", id], previousPost);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false })
    },
    onError: (_, __, rollBack) => { if (rollBack) { rollBack() } }
  })
}
export default useCreateComment