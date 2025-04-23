import {
  Button,
  CircularProgress,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthRegister, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import Input from "../../ui/Input";
import FileUploadButton from "../../ui/FileUploadButton";

const RegisterModal = () => {
  const { loading } = useAppSelector((state) => state.authentication);
  const [formData, setFormData] = useState({
    image: null as File | null,
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };
  const dispatch = useAppDispatch();
  const handleSubmitRegister = () => {
    dispatch(actAuthRegister(formData))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "Signup Successfully!", severity: "success" })
        );
        dispatch(closeModal());
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
        <FileUploadButton onChange={handleImageChange} label="Photo" />
        <Input
          value={formData.name}
          onChange={inputHandler}
          name="name"
          label="Name"
        />
        <Input
          value={formData.username}
          onChange={inputHandler}
          name="username"
          label="User Name"
        />
        <Input
          value={formData.email}
          onChange={inputHandler}
          name="email"
          label="Email"
        />
        <Input
          value={formData.password}
          onChange={inputHandler}
          type="password"
          name="password"
          label="Password"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmitRegister}
          disabled={loading == "pending"}
        >
          {loading == "pending" ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </DialogActions>
    </>
  );
};
export default RegisterModal;
