import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CircularProgress, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthLogin, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import useLoginForm from "./useLoginModal";

const LoginModal = () => {
  const { open, handleClickOpen, handleClose } = useLoginForm();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authentication);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(actAuthLogin(formData))
      .unwrap()
      .then(() => {
        handleClose();
        dispatch(resetUI());
        setFormData({ username: "", password: "" });
        dispatch(
          showToast({ message: "Logged In Successfully!", severity: "success" })
        );
      })
      .catch((error) => {
        dispatch(showToast({ message: error, severity: "error" }));
      });
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ marginInlineStart: "20px" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
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
          <IconButton aria-label="add a comment" onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ paddingY: "0px" }}>
          <TextField
            margin="dense"
            id="name"
            name="username"
            label="User Name"
            fullWidth
            variant="standard"
            value={formData.username}
            onChange={inputHandler}
          />
          <TextField
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            fullWidth
            margin="dense"
            value={formData.password}
            onChange={inputHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading == "pending"}>
            {loading == "pending" ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LoginModal;
