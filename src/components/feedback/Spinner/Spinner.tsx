import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <CircularProgress color="error" />
    </Box>
  );
};
export default Spinner;
