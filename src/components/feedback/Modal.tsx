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
    >
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
