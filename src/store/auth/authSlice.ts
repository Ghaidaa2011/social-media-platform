import { createSlice } from "@reduxjs/toolkit";
// import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { isString, TLoading } from "../../types";
import actAuthLogout from "./act/actAuthLogout";
import actAuthRegister from "./act/actAuthRegister";

interface IAuthState {
  user: {
    username: string;
    name: string;
    email: string;
    id: number;
    profile_image: string | null;
    comments_count: number;
    posts_count: number;
  } | null;
  token: string | null;
  loading: TLoading;
  error: null | string;
}
const initialState: IAuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,

};
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
    })
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
    //log in
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
    })
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
    })
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
    //log out
    builder.addCase(actAuthLogout.pending, (state) => {
      state.loading = "pending";
    })
    builder.addCase(actAuthLogout.fulfilled, (state) => {
      state.loading = "succeeded";
      state.token = null;
      state.user = null;
    })
    builder.addCase(actAuthLogout.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
  },
});
export const { resetUI } = authSlice.actions
export {
  actAuthRegister,
  actAuthLogin,
  actAuthLogout
};
export default authSlice.reducer;