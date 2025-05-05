import {
  Button,
  CircularProgress,
  DialogContent,
  DialogActions,
} from "@mui/material";
//react
import { /*FocusEvent,*/ useEffect } from "react";
//store
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actAuthRegister, resetUI } from "../../../store/auth/authSlice";
import { closeModal } from "../../../store/Modal/modalSlice";
import { showToast } from "../../../store/toast/toastsSlice";
//form
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterType } from "./RegisterSchema";
//components
import Input from "../Input/Input";
import FileUploadInput from "../Input/FileUploadInput";
//hooks
// import useCheckEmailAvailability from "./useCheckEmailAvailability";

const RegisterModal = () => {
  const { loading } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // getFieldState,
    // trigger,
  } = useForm<RegisterType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const selectedFile = watch("image");

  const submitHandlerForm: SubmitHandler<RegisterType> = (formData) => {
    const formDataToSubmit = {
      ...formData,
      image: formData.image?.[0] || null,
    };
    dispatch(actAuthRegister(formDataToSubmit))
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
  // const { enteredEmail, checkEmailAvailability, restCheckEmailAvailability } =
  //   useCheckEmailAvailability();
  // const onBlurHandler = async (e: FocusEvent<HTMLInputElement>) => {
  //   await trigger("email");
  //   const { isDirty, invalid } = getFieldState("email");
  //   const valueToCheck = e.target.value;
  //   if (isDirty && !invalid && valueToCheck !== enteredEmail) {
  //     //check if the email is available
  //     checkEmailAvailability(valueToCheck);
  //   }
  //   if (isDirty && invalid && enteredEmail) {
  //     //reset the email check
  //     restCheckEmailAvailability();
  //   }
  // };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return (
    <>
      <DialogContent sx={{ paddingY: "0px" }}>
        <FileUploadInput
          label="Photo"
          name="image"
          register={register}
          selectedFile={selectedFile?.[0]}
          errorMessage={errors.image?.message}
        />
        <Input
          label="Name"
          name="name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <Input
          label="User Name"
          name="username"
          register={register}
          errorMessage={errors.username?.message}
        />
        <Input
          label="Email"
          name="email"
          register={register}
          // onBlur={onBlurHandler}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button
          onClick={handleSubmit(submitHandlerForm)}
          disabled={loading == "pending"}
        >
          {loading == "pending" ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </DialogActions>
    </>
  );
};
export default RegisterModal;
