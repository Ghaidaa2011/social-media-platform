import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "@/utils";
import api from "@/services/axios-global";
type TResponse = {
  data: {
    username: string;
    name: string;
    email: string;
    id: number;
    profile_image: string;
    comments_count: number;
    posts_count: number;
  };
};
interface RootState {
  authentication: {
    token: string | null;
  };
}
const actAuthLogout = createAsyncThunk(
  "auth/actAuthLogout",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    const token = state.authentication.token;
    try {
      const logoutResponse = await api.post<TResponse>("/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      return logoutResponse.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actAuthLogout;