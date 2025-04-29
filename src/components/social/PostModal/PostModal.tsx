import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useCallback, useState } from "react";
import Input from "../../ui/Input";
import FileUploadButton from "../../ui/FileUploadButton";

interface FormData {
  title: string;
  body: string;
  image: File | null;
}

interface PostFormProps {
  initialData?: {
    title: string;
    body: string;
  };
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  submitButtonText: string;
}

const PostModal = ({
  initialData = { title: "", body: "" },
  onSubmit,
  isLoading,
  submitButtonText,
}: PostFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData.title,
    body: initialData.body,
    image: null,
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
    onSubmit(formData);
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
          accept="image/*"
          label={initialData.title ? "Change Photo" : "Upload Photo"}
          selectedFile={formData.image}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading || isFormInvalid} onClick={handleSubmit}>
          {isLoading ? <CircularProgress size={24} /> : submitButtonText}
        </Button>
      </DialogActions>
    </>
  );
};

export default PostModal;
