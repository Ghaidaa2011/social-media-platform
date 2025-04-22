import {
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Divider,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthRegister, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import useRegisterModal from "./useRegisterModal";

const RegisterModal = () => {
  const { openRegister, handleClickOpenRegister, handleCloseRegister } =
    useRegisterModal();
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
        handleCloseRegister();
      })
      .catch((error) => {
        dispatch(showToast({ message: error, severity: "error" }));
      });
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return (
    <>
      <Button
        variant="outlined"
        color="success"
        size="small"
        sx={{ marginInlineStart: "20px" }}
        onClick={handleClickOpenRegister}
      >
        register
      </Button>
      <Dialog
        open={openRegister}
        onClose={handleCloseRegister}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmitRegister,
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
          <IconButton aria-label="add a comment" onClick={handleCloseRegister}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ paddingY: "0px" }}>
          <Button
            sx={{ marginTop: "3vh" }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {formData.image ? formData.image.name : "Photo/Video"}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <TextField
            value={formData.name}
            onChange={inputHandler}
            type="text"
            name="name"
            id="name"
            label="Name"
            variant="standard"
            fullWidth
          />
          <TextField
            value={formData.username}
            onChange={inputHandler}
            type="text"
            name="username"
            id="username"
            label="User Name"
            variant="standard"
            fullWidth
          />
          <TextField
            value={formData.email}
            onChange={inputHandler}
            type="text"
            name="email"
            id="email"
            label="Email"
            variant="standard"
            fullWidth
          />
          <TextField
            value={formData.password}
            onChange={inputHandler}
            type="password"
            name="password"
            id="password"
            label="Password"
            variant="standard"
            fullWidth
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
      </Dialog>
    </>
  );
};
export default RegisterModal;
