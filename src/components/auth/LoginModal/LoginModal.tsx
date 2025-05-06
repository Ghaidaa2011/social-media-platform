import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress } from "@mui/material";
//hooks
import { useEffect } from "react";
//store
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { showToast } from "@store/toast/toastsSlice";
import { closeModal } from "@store/Modal/modalSlice";
//form
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
//components
import Input from "../Input/Input";
import CustomButton from "@components/ui/CustomButton";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authentication);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });
  const submitHandlerForm: SubmitHandler<LoginType> = (formData) => {
    dispatch(actAuthLogin(formData))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        dispatch(
          showToast({ message: "Logged In Successfully!", severity: "success" })
        );
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
  return (
    <>
      <DialogContent sx={{ paddingY: "0px" }}>
        <Input
          label="User Name"
          name="username"
          register={register}
          errorMessage={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={() => dispatch(closeModal())}>
          Cancel
        </CustomButton>
        <CustomButton
          disabled={loading == "pending"}
          onClick={handleSubmit(submitHandlerForm)}
        >
          {loading == "pending" ? <CircularProgress size={24} /> : "Login"}
        </CustomButton>
      </DialogActions>
    </>
  );
};
export default LoginModal;
