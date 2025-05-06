import { Button } from "@mui/material";
import { useAppDispatch } from "@store/hooks";
import { openModal } from "@store/Modal/modalSlice";

const LoginButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="contained"
      color="success"
      size="small"
      sx={{ marginInlineStart: "20px" }}
      onClick={() => {
        dispatch(
          openModal({ titleModal: "Login", componentName: "LoginModal" })
        );
      }}
    >
      Login
    </Button>
  );
};
export default LoginButton;
