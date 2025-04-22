import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actCreatePost, actGetPosts } from "../../../store/posts/postsSlice";
import UseAddPostModal from "./UseAddPostModal";
// import { openModal } from "../../../store/Modal/modalSlice";

const AddPostModal = () => {
  const { openAdd, handleClickOpenAdd, handleCloseAdd } = UseAddPostModal();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null as File | null,
  });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actCreatePost(formData)).then(() => {
      setFormData({ title: "", body: "", image: null });
      handleCloseAdd();
      dispatch(actGetPosts());
    });
  };
  const isFormInvalid =
    formData.title.trim() === "" || formData.body.trim() === "";

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
  return (
    <>
      <IconButton
        aria-label="add a comment"
        style={{
          position: "fixed",
          right: "5%",
          bottom: "5%",
          zIndex: "100",
        }}
        onClick={
          handleClickOpenAdd
          //   () => {
          //   dispatch(openModal());
          // }
        }
      >
        <AddCircleRoundedIcon
          sx={{
            color: "darkred",
            fontSize: { xs: "3rem", sm: "3.5rem" },
          }}
        />
      </IconButton>
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
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
          Create a new post
          <IconButton
            aria-label="add a comment"
            onClick={() => {
              handleCloseAdd();
              setFormData({ title: "", body: "", image: null });
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ paddingY: "0px" }}>
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={inputHandler}
          />
          <TextField
            margin="dense"
            id="body"
            name="body"
            label="What do you think about?"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={formData.body}
            onChange={inputHandler}
          />
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
              accept="image/*,video/*"
              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            disabled={loading == "pending" || isFormInvalid}
          >
            {loading == "pending" ? <CircularProgress size={24} /> : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddPostModal;
