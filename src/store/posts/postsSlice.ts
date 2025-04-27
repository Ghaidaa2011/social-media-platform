import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, isString, TLoading } from "../../types";
import actCreatePost from "./act/actCreatePost";

interface IPostsState {
  records: IPost[];
  loading: TLoading;
  error: string | null;
  postInfo: IPost | null
}
const initialState: IPostsState = {
  records: [],
  loading: "idle",
  error: null,
  postInfo: null
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanPostInfo: (state) => { state.postInfo = null },

  },
  extraReducers: (builder) => {
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
export const { cleanPostInfo } = postsSlice.actions;

export { actCreatePost };
export default postsSlice.reducer;