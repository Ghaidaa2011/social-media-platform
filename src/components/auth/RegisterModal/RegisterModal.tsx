import {
  Button,
  CircularProgress,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthRegister, resetUI } from "../../../store/auth/authSlice";
import { showToast } from "../../../store/toast/toastsSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import Input from "../../ui/Input";
import FileUploadButton from "../../ui/FileUploadButton";
import exifr from "exifr";

const RegisterModal = () => {
  const { loading } = useAppSelector((state) => state.authentication);
  const [formData, setFormData] = useState({
    image: null as File | null,
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    try {
      // Get the orientation from EXIF data
      const orientation = await exifr.orientation(file);

      // Create a new FileReader
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to draw the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions based on orientation
          if (
            orientation &&
            (orientation === 5 ||
              orientation === 6 ||
              orientation === 7 ||
              orientation === 8)
          ) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }

          if (!ctx) return;

          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Move to center of canvas
          ctx.translate(canvas.width / 2, canvas.height / 2);

          // Rotate based on orientation
          if (orientation) {
            switch (orientation) {
              case 2:
                ctx.scale(-1, 1);
                break;
              case 3:
                ctx.rotate(Math.PI);
                break;
              case 4:
                ctx.scale(1, -1);
                break;
              case 5:
                ctx.rotate(Math.PI / 2);
                ctx.scale(1, -1);
                break;
              case 6:
                ctx.rotate(Math.PI / 2);
                break;
              case 7:
                ctx.rotate(-Math.PI / 2);
                ctx.scale(1, -1);
                break;
              case 8:
                ctx.rotate(-Math.PI / 2);
                break;
              default:
                break;
            }
          }

          // Draw the image
          ctx.drawImage(img, -img.width / 2, -img.height / 2);

          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a new file from the blob
              const correctedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: file.lastModified,
              });
              setFormData({ ...formData, image: correctedFile });
            }
          }, file.type);
        };
        img.src = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      // If there's an error, just use the original file
      setFormData({ ...formData, image: file });
    }
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
  console.log(formData.image);
  return (
    <>
      <DialogContent sx={{ paddingY: "0px" }}>
        <FileUploadButton
          onChange={handleImageChange}
          label="Photo"
          selectedFile={formData.image}
        />
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
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button onClick={handleSubmitRegister} disabled={loading == "pending"}>
          {loading == "pending" ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </DialogActions>
    </>
  );
};
export default RegisterModal;
