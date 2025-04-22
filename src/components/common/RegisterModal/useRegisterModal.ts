import { useState } from "react";

const useRegisterModal = () => {
  const [openRegister, setOpenRegister] = useState(false);

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  return { openRegister, handleClickOpenRegister, handleCloseRegister }
}
export default useRegisterModal