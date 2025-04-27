import { TextField, TextFieldProps } from "@mui/material";
import { memo } from "react";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
}
const Input = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  variant = "standard",
  fullWidth = true,
  error = false,
  helperText = "",
  autoFocus = false,
  ...rest
}: InputProps) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      id={name}
      variant={variant}
      fullWidth={fullWidth}
      margin="dense"
      error={error}
      helperText={helperText}
      autoFocus={autoFocus}
      {...rest}
    />
  );
};

export default memo(Input);
