import { Button, ButtonProps, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { memo } from "react";

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
interface FileUploadButtonProps extends Omit<ButtonProps, "onChange"> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  label?: string;
  selectedFile?: File | null;
}
const FileUploadButton = ({
  onChange,
  accept = "image/*",
  label = "Upload File",
  selectedFile = null,
  variant = "contained",
  startIcon = <CloudUploadIcon />,
  sx = { marginTop: "3vh" },
  ...rest
}: FileUploadButtonProps) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant={variant}
      tabIndex={-1}
      startIcon={startIcon}
      sx={{ ...sx }}
      {...rest}
    >
      {selectedFile ? selectedFile.name : label}
      <VisuallyHiddenInput type="file" accept={accept} onChange={onChange} />
    </Button>
  );
};
export default memo(FileUploadButton);
