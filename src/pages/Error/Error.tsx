import { Stack } from "@mui/material";
import LottieHandler from "../../components/feedback/LottieHandler/LottieHandler";
import { Link } from "react-router";
const Error = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <LottieHandler type="notFound" />
      <Link to="/">Go to Home</Link>
    </Stack>
  );
};
export default Error;
