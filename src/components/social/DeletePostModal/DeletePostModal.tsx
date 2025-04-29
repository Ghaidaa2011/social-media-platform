import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useAppDispatch } from "../../../store/hooks";
import { closeModal } from "../../../store/Modal/modalSlice";
import useDeletePost from "../../../hooks/useDeletePost";
import { showToast } from "../../../store/toast/toastsSlice";

const DeletePostModal = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const deletePost = useDeletePost();
  const handleDeleteClick = () => {
    deletePost.mutate(id, {
      onSuccess: () => {
        dispatch(closeModal());
      },
      onError: () => {
        dispatch(
          showToast({ message: "Failed to delete post", severity: "error" })
        );
      },
    });
  };
  return (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => dispatch(closeModal())}>
          Cancel
        </Button>
        <Button
          variant="contained"
          autoFocus
          color="error"
          onClick={handleDeleteClick}
          disabled={deletePost.isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
};
export default DeletePostModal;
