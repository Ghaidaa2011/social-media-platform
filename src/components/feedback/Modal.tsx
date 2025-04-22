import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../../store/Modal/modalSlice";

const Modal = () => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
      PaperProps={{
        component: "form",
        // onSubmit: handleSubmit,
      }}
    >
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Login
        <IconButton
          aria-label="add a comment"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ paddingY: "0px" }}></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
export default Modal;
