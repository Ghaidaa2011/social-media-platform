import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast } from "../../store/toast/toastsSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toasts.toast);
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideToast());
  };
  return (
    <div>
      <Snackbar
        open={!!toast}
        /* autoHideDuration={2000} */
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toast?.severity}
          variant="filled"
          sx={{ width: { xs: "100%", lg: "265px" } }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Toast;
