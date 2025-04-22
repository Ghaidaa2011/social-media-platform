import { useState } from "react";

const UseAddPostModal = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  return { openAdd, handleClickOpenAdd, handleCloseAdd }
}
export default UseAddPostModal