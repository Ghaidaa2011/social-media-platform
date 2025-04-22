import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "../../../utils";

import { IPost } from "../../../types";
import api from "../../../services/axios-global";

type TResponse = {
  data: IPost[]
};
const actGetPosts = createAsyncThunk(
  "posts/actGetPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI
    try {
      const postsResponse = await api.get<TResponse>("/posts?limit=5", { signal })
      return postsResponse.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error))
    }
  }
)
export default actGetPosts;