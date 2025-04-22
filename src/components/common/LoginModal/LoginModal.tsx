import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthLogin, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";

const LoginModal = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authentication);
  const handleSubmit = () => {
    dispatch(actAuthLogin(formData))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
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
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button
          type="submit"
          disabled={loading == "pending"}
          onClick={handleSubmit}
        >
          {loading == "pending" ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </DialogActions>
    </>
  );
};
export default LoginModal;
