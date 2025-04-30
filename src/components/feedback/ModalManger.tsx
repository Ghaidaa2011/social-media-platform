import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { closeModal } from "../../store/Modal/modalSlice";

import Modal from "./Modal";

import AddPostModal from "../social/AddPostModal/AddPostModal";
import LoginModal from "../auth/LoginModal/LoginModal";
import RegisterModal from "../auth/RegisterModal/RegisterModal";

import AddCommentModal from "../social/AddCommentModal/AddCommentModal";
import EditPostModal from "../social/EditPostModal/EditPostModal";
import DeletePostModal from "../social/DeletePostModal/DeletePostModal";

const ModalManger = () => {
  const { isOpen, titleModal, componentName, childrenProps } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const componentsLookUp: { [key: string]: React.FC<any> } = {
    LoginModal,
    RegisterModal,
    AddPostModal,
    AddCommentModal,
    EditPostModal,
    DeletePostModal,
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
