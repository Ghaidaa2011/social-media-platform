import { TextField, TextFieldProps } from "@mui/material";
import { memo } from "react";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const Input = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  variant = "standard",
  fullWidth = true,

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
      {...rest}
    />
  );
};

export default memo(Input);
