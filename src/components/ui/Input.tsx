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
}
const Input = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
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
      variant="standard"
      fullWidth={true}
      margin="dense"
      error={error}
      helperText={helperText}
      autoFocus={false}
      {...rest}
    />
  );
};

export default memo(Input);
