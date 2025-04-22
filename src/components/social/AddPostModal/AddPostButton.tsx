import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAppDispatch } from "../../../store/hooks";
import { openModal } from "../../../store/Modal/modalSlice";

const AddPostButton = () => {
  const dispatch = useAppDispatch();
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
};
export default AddPostButton;
