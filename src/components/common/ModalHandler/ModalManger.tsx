import { useAppDispatch, useAppSelector } from "@store/hooks";

import { closeModal } from "@store/Modal/modalSlice";

import Modal from "./Modal";

import AddPostModal from "@components/social/AddPostModal/AddPostModal";
import LoginModal from "@components/auth/LoginModal/LoginModal";
import RegisterModal from "@components/auth/RegisterModal/RegisterModal";

import AddCommentModal from "@components/social/AddCommentModal/AddCommentModal";
import EditPostModal from "@components/social/EditPostModal/EditPostModal";
import DeletePostModal from "@components/social/DeletePostModal/DeletePostModal";

const ModalManger = () => {
  const { isOpen, titleModal, componentName, childrenProps } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentsMap: { [key: string]: React.FC<any> } = {
    LoginModal,
    RegisterModal,
    AddPostModal,
    AddCommentModal,
    EditPostModal,
    DeletePostModal,
  };

  let renderedComponent;

  if (componentName) {
    const SelectedComponent = componentsMap[componentName]; //LoginModal
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
