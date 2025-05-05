import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type ButtonPropsType = {
  children: ReactNode;
} & Omit<ButtonProps, "children">;
const CustomButton = ({ children, ...props }: ButtonPropsType) => {
  return <Button {...props}>{children}</Button>;
};
export default CustomButton;
