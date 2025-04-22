import AddPostModal from "../social/AddPostModal/AddPostModal";
import LoginModal from "../common/LoginModal/LoginModal";
import RegisterModal from "../common/RegisterModal/RegisterModal";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "./Modal";
import { closeModal } from "../../store/Modal/modalSlice";

const ModalManger = () => {
  const { isOpen, titleModal, componentName, childernProps } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  interface ComponentMap {
    [key: string]: () => ReactNode;
  }
  const componentsLookUp: ComponentMap = {
    LoginModal,
    RegisterModal,
    AddPostModal,
  };
  let renderedComponent;
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName]; //LoginModal
    if (SelectedComponent) {
      //LoginLoginModal
      renderedComponent = <SelectedComponent {...childernProps} />; //<LogiLoginModaln/>
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      titleModal={titleModal}
      closeModalHandler={closeModalHandler}
    >
      {renderedComponent}
    </Modal>
  );
};
export default ModalManger;
