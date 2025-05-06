import { IconButton } from "@mui/material";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { useAppDispatch } from "@store/hooks";
import { openModal } from "@store/Modal/modalSlice";
import { type IPost } from "@/types";
const AddCommentButton = ({
  id,
  title,
  body,
  image,
  created_at,
  author,
  comments_count,
}: IPost) => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      aria-label="add a comment"
      onClick={() => {
        dispatch(
          openModal({
            titleModal: `${author?.username}'s Post`,
            componentName: "AddCommentModal",
            childrenProps: {
              id,
              body,
              title,
              image,
              created_at,
              author,
              comments_count,
            },
          })
        );
      }}
    >
      <ModeCommentRoundedIcon
        style={{ color: "rgba(0,0,0,0.8)", fontSize: "1.3rem" }}
      />
    </IconButton>
  );
};
export default AddCommentButton;
