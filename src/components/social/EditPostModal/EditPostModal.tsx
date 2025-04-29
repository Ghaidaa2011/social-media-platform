import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../store/Modal/modalSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import { IPost } from "../../../types";
import useUpdatePost from "../../../hooks/Posts/useUpdatePost";
import PostForm from "../PostModal/PostModal";

const EditPostModal = ({ id: postId, title, body }: IPost) => {
  const dispatch = useAppDispatch();
  const updatePost = useUpdatePost();

  const handleSubmit = (formData: {
    title: string;
    body: string;
    image: File | null;
  }) => {
    updatePost.mutate(
      {
        id: postId,
        post: formData,
      },
      {
        onSuccess: () => {
          dispatch(closeModal());
        },
        onError: () => {
          if (updatePost.error) {
            dispatch(
              showToast({
                message: updatePost.error?.message,
                severity: "error",
              })
            );
          }
        },
      }
    );
  };

  return (
    <PostForm
      initialData={{ title, body }}
      onSubmit={handleSubmit}
      isLoading={updatePost.isPending}
      submitButtonText="Update"
    />
  );
};

export default EditPostModal;
