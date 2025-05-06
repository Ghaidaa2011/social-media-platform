import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { FocusEvent } from "react";

type InputProsType<F extends FieldValues> = {
  label: string;
  name: Path<F>;
  type?: string;
  register: UseFormRegister<F>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  errorMessage?: string;
} & Omit<TextFieldProps, "name" | "type">;

const Input = <F extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  onBlur,
  errorMessage,
  ...rest
}: InputProsType<F>) => {
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <TextField
      label={label}
      {...register(name)}
      onBlur={onBlurHandler}
      type={type}
      error={!!errorMessage}
      helperText={errorMessage}
      variant="standard"
      fullWidth={true}
      margin="dense"
      {...rest}
    />
  );
};
export default Input;
