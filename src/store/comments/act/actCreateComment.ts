// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AxiosErrorHandler } from "../../../utils";
// import api from "../../../services/axios-global";
// import { RootState } from "../..";
// import { IComment } from "../../../types/posts.types";

// type IData = {
//   id: number;
//   comment: string;
// };
// type TResponse = {
//   data: { comment: IComment }
// };
// const actCreateComment = createAsyncThunk(
//   "comments/actCreateComment",
//   async ({ id, comment }: IData, thunkAPI) => {
//     const { rejectWithValue, signal, getState } = thunkAPI
//     const state = getState() as RootState;
//     const token = state.authentication.token;
//     console.log("sending comment", { id, comment, token });
//     try {
//       const { data } = await api.post<TResponse>(`/posts/${id}/comments`, { body: comment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//           signal
//         })
//       console.log(data)
//       return data.data.comment;
//     } catch (error) {
//       console.log(error)
//       return rejectWithValue(AxiosErrorHandler(error))
//     }
//   }
// )
// export default actCreateComment;