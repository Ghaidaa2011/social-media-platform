import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { openModal } from "@store/Modal/modalSlice";
import { useAppDispatch } from "@store/hooks";

const DeletePostButton = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      aria-label="delete"
      size="small"
      color="error"
      onClick={() => {
        dispatch(
          openModal({
            titleModal: `Delete the post`,
            componentName: "DeletePostModal",
            childrenProps: {
              id,
            },
          })
        );
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
export default DeletePostButton;
