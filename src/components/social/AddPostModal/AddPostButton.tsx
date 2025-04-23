import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openModal } from "../../../store/Modal/modalSlice";

const AddPostButton = () => {
  const { token } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  return (
    <>
      {token && (
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
      )}
    </>
  );
};
export default AddPostButton;
