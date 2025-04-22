// import { isAxiosError } from "axios";
// const AxiosErrorHandler = (error: unknown) => {
//   //isAxiosError(error) this is a Guard
//   if (isAxiosError(error)) {
//     return error.response?.data || error.response?.data.message || error.message;
//   } else {
//     return "An unexpected error";
//   }
// }
// export default AxiosErrorHandler
import { isAxiosError } from "axios";

const AxiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response?.data?.errors) {
      const firstErrorKey = Object.keys(error.response.data.errors)[0];
      return error.response.data.errors[firstErrorKey][0];
    } else {
      return error.message || "An unexpected error occurred.";
    }
  } else {
    return "An unexpected error occurred.";
  }
};

export default AxiosErrorHandler;