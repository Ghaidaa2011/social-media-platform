import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IToast } from "../../types/toast.types"

export interface ITodosState {
  toast: IToast | null
}
const initialState: ITodosState = {
  toast: null,
}
export const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<IToast>) => {
      state.toast = action.payload
    },
    hideToast: (state) => {
      state.toast = null
    },
  },
}
)
export const { showToast, hideToast } = toastsSlice.actions

export default toastsSlice.reducer