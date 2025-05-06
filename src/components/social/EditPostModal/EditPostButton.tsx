import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { openModal } from "@store/Modal/modalSlice";
import { useAppDispatch } from "@store/hooks";
import { type IPost } from "@/types";

const EditPostButton = ({ id, title, body, image, author }: IPost) => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      aria-label="edit"
      size="small"
      color="primary"
      onClick={() => {
        dispatch(
          openModal({
            titleModal: `Edit ${author?.name}'s post`,
            componentName: "EditPostModal",
            childrenProps: {
              id,
              title,
              body,
              image,
              author,
            },
          })
        );
      }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
};
export default EditPostButton;
