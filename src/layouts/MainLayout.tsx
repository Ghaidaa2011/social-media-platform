import { Container } from "@mui/material";
import Header from "../components/common/Header/Header";
import Toast from "../components/feedback/Toast/Toast";
import { Outlet } from "react-router";
import AddPostButton from "../components/social/AddPostModal/AddPostButton";
import ModalManger from "../components/common/ModalHandler/ModalManger";
const MainLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth={"sm"}>
        <Outlet />
        <AddPostButton />
        <Toast />
        <ModalManger />
      </Container>
    </>
  );
};
export default MainLayout;
