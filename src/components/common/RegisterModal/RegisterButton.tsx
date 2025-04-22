import { Button } from "@mui/material";
import { useAppDispatch } from "../../../store/hooks";
import { openModal } from "../../../store/Modal/modalSlice";

const RegisterButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="outlined"
      color="success"
      size="small"
      sx={{ marginInlineStart: "20px" }}
      onClick={() => {
        dispatch(
          openModal({ titleModal: "Register", componentName: "RegisterModal" })
        );
      }}
    >
      register
    </Button>
  );
};
export default RegisterButton;
