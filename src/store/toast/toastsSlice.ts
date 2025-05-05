import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IToast } from "../../types/toast.types";

export interface ITodosState {
  open: boolean;
  toast: IToast | null;
}
const initialState: ITodosState = {
  open: false,
  toast: null,
}
export const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<IToast>) => {
      state.open = true
      state.toast = action.payload
    },
    hideToast: (state) => {
      state.open = false
    },
  },
}
)
export const { showToast, hideToast } = toastsSlice.actions

export default toastsSlice.reducer