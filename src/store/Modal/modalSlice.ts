import { createSlice } from "@reduxjs/toolkit"

export interface IModalState {
  isOpen: boolean
  titleModal: string;
  componentName: string;
  childrenProps?: object; // to add any props to the modal content
}
const initialState: IModalState = {
  isOpen: false,
  titleModal: "",
  componentName: "",
  childrenProps: {}
}
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.titleModal = action.payload.titleModal;
      state.componentName = action.payload.componentName;
      state.childrenProps = action.payload.childrenProps
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.titleModal = "";
      state.childrenProps = {};
    },
  },
})
export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer