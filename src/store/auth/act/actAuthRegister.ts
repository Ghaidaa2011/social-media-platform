import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "../../../utils";
import api from "../../../services/axios-global";

type TFormData = {
  username: string;
  name: string;
  email: string;
  password: string;
  image: File | null;
};

interface TResponse {
  user: {
    username: string;
    name: string;
    email: string;
    id: number;
    profile_image: string | null;
    comments_count: number;
    posts_count: number;
  },
  token: string

};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue, signal } = thunk;
    try {
      const multipartData = new FormData();
      multipartData.append("username", formData.username);
      multipartData.append("name", formData.name);
      multipartData.append("password", formData.password);
      multipartData.append("email", formData.email);
      if (formData.image) {
        multipartData.append("image", formData.image);
      }
      const registerResponse = await api.post<TResponse>("/register", multipartData, { signal });
      // Normalize profile_image: Convert {} to null
      const user = {
        ...registerResponse.data.user,
        profile_image:
          registerResponse.data.user.profile_image &&
            typeof registerResponse.data.user.profile_image === "object"
            ? null
            : registerResponse.data.user.profile_image,
      };
      return { ...registerResponse.data, user };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;