import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actCreatePost, actGetPosts } from "../../../store/posts/postsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import { showToast } from "../../../store/toast/toastsSlice";

const AddPostModal = () => {
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
  const handleSubmit = () => {
    dispatch(actCreatePost(formData))
      .unwrap()
      .then(() => {
        setFormData({ title: "", body: "", image: null });
        dispatch(actGetPosts());
        dispatch(closeModal());
      })
      .catch((error) => {
        dispatch(showToast({ message: error, severity: "error" }));
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
          onClick={handleSubmit}
        >
          {loading == "pending" ? <CircularProgress size={24} /> : "Post"}
        </Button>
      </DialogActions>
    </>
  );
};
export default AddPostModal;
