import { Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ReactNode } from "react";

interface IModalProps {
  isOpen: boolean;
  titleModal: string;
  closeModalHandler: () => void;
  children: ReactNode;
}
const Modal = ({
  isOpen,
  titleModal,
  closeModalHandler,
  children,
}: IModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModalHandler}
      PaperProps={{
        component: "form",
      }}
      fullWidth
    >
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          boxShadow: "3px 3px 1px 1px rgba(0, 0, 0, 0.03)",
        }}
      >
        {titleModal}
        <IconButton aria-label="add a comment" onClick={closeModalHandler}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      {children}
    </Dialog>
  );
};
export default Modal;
