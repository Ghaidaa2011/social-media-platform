import { Container } from "@mui/material";
import Header from "../components/common/Header/Header";
import Toast from "../components/feedback/Toast";
import { Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import AddPostButton from "../components/social/AddPostModal/AddPostButton";
import ModalManger from "../components/feedback/ModalManger";
const MainLayout = () => {
  console.log("MainLayout");

  const { token } = useAppSelector((state) => state.authentication);
  return (
    <Container maxWidth={"md"}>
      <Header />
      <Outlet />
      {token && <AddPostButton />}

      <Toast />
      <ModalManger />
    </Container>
  );
};
export default MainLayout;
