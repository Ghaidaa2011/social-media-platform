import { createSlice } from "@reduxjs/toolkit";
import { IPost, TLoading } from "../../types";

interface IPostsState {
  posts: IPost[];
  loading: TLoading;
  error: string | null;
  postInfo: IPost | null
}
const initialState: IPostsState = {
  posts: [],
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

});
export const { cleanPostInfo } = postsSlice.actions;


export default postsSlice.reducer;