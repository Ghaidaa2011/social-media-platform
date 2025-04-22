import { Container } from "@mui/material";
import Header from "../components/common/Header/Header";
import Toast from "../components/feedback/Toast";
import Modal from "../components/feedback/Modal";
import { Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import AddPostModal from "../components/social/AddPostModal/AddPostModal";
const MainLayout = () => {
  console.log("MainLayout");

  const { token } = useAppSelector((state) => state.authentication);
  return (
    <Container maxWidth={"md"}>
      <Header />
      <Outlet />
      {token && <AddPostModal />}
      <Toast />
      <Modal />
    </Container>
  );
};
export default MainLayout;
