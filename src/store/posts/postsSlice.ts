import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import actGetPosts from "./act/actGetPosts";
import { IPost, isString, TLoading } from "../../types";
import actCreatePost from "./act/actCreatePost";

interface IPostsState {
  records: IPost[];
  loading: TLoading;
  error: string | null;
}
const initialState: IPostsState = {
  records: [],
  loading: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //GET POSTS
    builder.addCase(actGetPosts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetPosts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // CREATE A POST
    builder.addCase(actCreatePost.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actCreatePost.fulfilled, (state, action: PayloadAction<IPost>) => {
      state.loading = "succeeded";
      state.records = [...state.records, action.payload];
    });
    builder.addCase(actCreatePost.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetPosts, actCreatePost };
export default postsSlice.reducer;