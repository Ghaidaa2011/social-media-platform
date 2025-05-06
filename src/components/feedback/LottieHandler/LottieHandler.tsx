import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";

const lottieMap = {
  loading,
  error,
  notFound,
  empty,
};

interface LottieHandlerProps {
  type: keyof typeof lottieMap;
  message?: string;
}

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieMap[type];
  return (
    <Stack justifyContent="center" alignItems="center">
      <Lottie
        animationData={lottie}
        style={{ width: "300px", height: "300px" }}
      />
      {message && <Typography>{message}</Typography>}
    </Stack>
  );
};
export default LottieHandler;
