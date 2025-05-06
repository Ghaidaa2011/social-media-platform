import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { openModal } from "@store/Modal/modalSlice";
import { memo } from "react";

const AddPostButton = memo(() => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authentication.token);

  if (!token) return null;

  return (
    <IconButton
      aria-label="add a comment"
      style={{
        position: "fixed",
        right: "5%",
        bottom: "5%",
        zIndex: "100",
      }}
      onClick={() => {
        dispatch(
          openModal({
            titleModal: "Create a new post",
            componentName: "AddPostModal",
          })
        );
      }}
    >
      <AddCircleRoundedIcon
        sx={{
          color: "darkred",
          fontSize: { xs: "3rem", sm: "3.5rem" },
        }}
      />
    </IconButton>
  );
});

AddPostButton.displayName = "AddPostButton";

export default AddPostButton;
