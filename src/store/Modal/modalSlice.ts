import { createSlice } from "@reduxjs/toolkit"

export interface IModalState {
  isOpen: boolean
  titleModal: string;
  componentName: string | null;
  childernProps: object; // to add any props to the modal content
}
const initialState: IModalState = {
  isOpen: false,
  titleModal: "",
  componentName: null,
  childernProps: {}
}
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.titleModal = action.payload.titleModal;
      state.componentName = action.payload.componentName;
      state.childernProps = action.payload.childernProps
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.titleModal = "";
      state.childernProps = {}
    },
  },
})
export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer