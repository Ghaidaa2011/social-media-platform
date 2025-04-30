import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios-global";
import { IPost } from "../../types";
import { AxiosError } from "axios";
import { useAppSelector } from "../../store/hooks";

interface UpdatePostData {
  id: number;
  post: {
    title: string;
    body: string;
    image: File | null;
  };
}

const updatePost = async ({ id, post }: UpdatePostData, token?: string | null): Promise<IPost> => {

  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("body", post.body);
  if (post.image) {
    formData.append("image", post.image);
  }
  formData.append("_method", "PUT");

  const { data } = await api.post<IPost>(`/posts/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return data;
};

const useUpdatePost = (): UseMutationResult<IPost, AxiosError, UpdatePostData> => {
  const queryClient = useQueryClient();
  const { token } = useAppSelector((state) => state.authentication);

  return useMutation({
    mutationFn: (data) => updatePost(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["user"], exact: false });
    },
  });
};

export default useUpdatePost;
