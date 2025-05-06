import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "@/utils";
import api from "@/services/axios-global";

type TFormData = {
  username: string;
  password: string;
};
type TResponse = {
  user: {
    username: string;
    name: string;
    email: string;
    id: number;
    profile_image: string | null;
    comments_count: number;
    posts_count: number;
  };
  token: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const loginResponse = await api.post<TResponse>("/login", formData);
      const user = {
        ...loginResponse.data.user,
        profile_image:
          loginResponse.data.user.profile_image &&
            typeof loginResponse.data.user.profile_image === "object"
            ? null
            : loginResponse.data.user.profile_image,
      };
      return { ...loginResponse.data, user };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;