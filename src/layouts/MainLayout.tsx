import { Container } from "@mui/material";
import Header from "../components/common/Header/Header";
import Toast from "../components/feedback/Toast";
import { Outlet } from "react-router";
import AddPostButton from "../components/social/AddPostModal/AddPostButton";
import ModalManger from "../components/feedback/ModalManger";
const MainLayout = () => {
  console.log("MainLayout");
  return (
    <Container maxWidth={"md"}>
      <Header />
      <Outlet />
      <AddPostButton />
      <Toast />
      <ModalManger />
    </Container>
  );
};
export default MainLayout;
