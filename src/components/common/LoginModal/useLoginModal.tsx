import { useState } from "react";

const useLoginModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return { open, handleClickOpen, handleClose };
};
export default useLoginModal;
