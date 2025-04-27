import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import AddPostModal from "../social/AddPostModal/AddPostModal";
import LoginModal from "../common/LoginModal/LoginModal";
import RegisterModal from "../common/RegisterModal/RegisterModal";
import AddCommentModal from "../social/AddCommentModal/AddCommentModal";

import Modal from "./Modal";

import { closeModal } from "../../store/Modal/modalSlice";

const ModalManger = () => {
  const { isOpen, titleModal, componentName, childrenProps } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  interface ComponentMap {
    [key: string]: (childrenProps: object) => ReactNode;
  }
  const componentsLookUp: ComponentMap = {
    LoginModal,
    RegisterModal,
    AddPostModal,
    AddCommentModal,
  };
  let renderedComponent;
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName]; //LoginModal
    if (SelectedComponent) {
      //LoginLoginModal
      renderedComponent = <SelectedComponent {...childrenProps} />; //<LogiLoginModaln/>
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
