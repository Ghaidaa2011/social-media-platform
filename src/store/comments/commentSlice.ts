// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { isString, TLoading } from "../../types";
// import { IComment } from "../../types/posts.types";
// import actCreateComment from "./act/actCreateComment";

// interface ICommentsState {
//   comments: IComment[];
//   loading: TLoading;
//   error: string | null;
// }
// const initialState: ICommentsState = {
//   comments: [],
//   loading: "idle",
//   error: null,
// };
// const commentSlice = createSlice({
//   name: "comments",
//   initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     // ADD A COMMENT
//     builder.addCase(actCreateComment.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(actCreateComment.fulfilled, (state, action: PayloadAction<IComment>) => {
//       state.loading = "succeeded";
//       state.comments = [...state.comments, action.payload];
//     });
//     builder.addCase(actCreateComment.rejected, (state, action) => {
//       state.loading = "failed";
//       if (isString(action.payload)) {
//         state.error = action.payload;
//       }
//     });
//   },
// });

// export { actCreateComment };
// export default commentSlice.reducer;