import { Button, ButtonProps, styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

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

interface FileUploadInputProps<F extends FieldValues>
  extends Omit<ButtonProps, "onChange"> {
  label: string;
  name: Path<F>;
  register: UseFormRegister<F>;
  errorMessage?: string;
  accept?: string;
  selectedFile?: File | null;
}

const FileUploadInput = <F extends FieldValues>({
  label = "Photo",
  name,
  register,
  errorMessage,
  accept = "image/*",
  selectedFile = null,
  variant = "contained",
  startIcon = <CloudUploadIcon />,
  sx = { marginTop: "3vh" },
  ...rest
}: FileUploadInputProps<F>) => {
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant={variant}
        tabIndex={-1}
        startIcon={startIcon}
        sx={{ ...sx }}
        color={errorMessage ? "error" : "primary"}
        {...rest}
      >
        {selectedFile ? selectedFile.name : label}
        <VisuallyHiddenInput type="file" accept={accept} {...register(name)} />
      </Button>
      {errorMessage && (
        <Typography
          color="error"
          variant="caption"
          sx={{ mt: 0.5, display: "block" }}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FileUploadInput;
