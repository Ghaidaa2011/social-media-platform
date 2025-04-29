import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../store/Modal/modalSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import useCreatePost from "../../../hooks/Posts/useCreatePost";
import PostForm from "../PostModal/PostModal";

const AddPostModal = () => {
  const createPost = useCreatePost();
  const dispatch = useAppDispatch();

  const handleSubmit = (formData: {
    title: string;
    body: string;
    image: File | null;
  }) => {
    createPost.mutate(formData, {
      onSuccess: () => {
        dispatch(closeModal());
      },
      onError: (error) => {
        dispatch(showToast({ message: error.message, severity: "error" }));
      },
    });
  };

  return (
    <PostForm
      onSubmit={handleSubmit}
      isLoading={createPost.isPending}
      submitButtonText="Post"
    />
  );
};

export default AddPostModal;
