import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthLogin, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import Input from "../../ui/Input";

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
        <Input
          value={formData.username}
          onChange={inputHandler}
          name="username"
          label="User Name"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
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
