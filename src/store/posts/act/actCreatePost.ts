import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "../../../utils";
import { IPost } from "../../../types";
import api from "../../../services/axios-global";
import { RootState } from "../..";

type TFormData = {
  title: string
  body: string;
  image: File | null;
};
type TResponse = {
  data: IPost
};
const actCreatePost = createAsyncThunk(
  "posts/actCreatePost",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI
    const state = getState() as RootState;
    const token = state.authentication.token;
    try {
      const multipartData = new FormData();
      multipartData.append("title", formData.title);
      multipartData.append("body", formData.body);
      if (formData.image) {
        multipartData.append("image", formData.image);
      }

      const postsResponse = await api.post<TResponse>("/posts", multipartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          signal
        })
      return postsResponse.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error))
    }
  }
)
export default actCreatePost;