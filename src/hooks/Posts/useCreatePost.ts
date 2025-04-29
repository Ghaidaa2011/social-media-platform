import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios-global"
import { IPost } from "../../types";
import { AxiosError } from "axios";
import { useAppSelector } from "../../store/hooks";

type TFormData = {
  title: string
  body: string;
  image: File | null;
};
type TResponse = {
  data: IPost
};
const createPost = async (formData: TFormData, token?: string | null): Promise<IPost> => {
  const multipartData = new FormData();
  multipartData.append("title", formData.title);
  multipartData.append("body", formData.body);
  if (formData.image) {
    multipartData.append("image", formData.image);
  }
  const { data } = await api.post<TResponse>("/posts", multipartData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    }
  })
  return data.data
}
const useCreatePost = (): UseMutationResult<IPost, AxiosError, TFormData> => {
  const queryClient = useQueryClient();
  const { token } = useAppSelector((state) => state.authentication);
  return useMutation({
    mutationFn: (formData) => createPost(formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["user"], exact: false });
    }
  })
}
export default useCreatePost