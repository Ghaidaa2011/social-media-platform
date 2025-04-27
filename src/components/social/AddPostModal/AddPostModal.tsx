import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actCreatePost } from "../../../store/posts/postsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import Input from "../../ui/Input";
import FileUploadButton from "../../ui/FileUploadButton";

const AddPostModal = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null as File | null,
  });
  const inputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };
  const handleSubmit = () => {
    dispatch(actCreatePost(formData))
      .unwrap()
      .then(() => {
        setFormData({ title: "", body: "", image: null });
        dispatch(closeModal());
      })
      .catch((error) => {
        dispatch(showToast({ message: error, severity: "error" }));
      });
  };
  const isFormInvalid =
    formData.title.trim() === "" || formData.body.trim() === "";
  return (
    <>
      <DialogContent sx={{ paddingY: "0px" }}>
        <Input
          name="title"
          label="Title"
          value={formData.title}
          onChange={inputHandler}
        />
        <Input
          name="body"
          label="What do you think about?"
          multiline
          rows={4}
          value={formData.body}
          onChange={inputHandler}
        />
        <FileUploadButton
          onChange={handleImageChange}
          accept="image/*,video/*"
          label="Photo/Video"
        />
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
