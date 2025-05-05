import { ReactNode } from "react";
import Spinner from "../Spinner/Spinner";
import PostsSkeleton from "../skeletons/PostsSkeleton";
import ProfileInfoSkeleton from "../skeletons/ProfileInfoSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const loadingMap = {
  spinner: Spinner,
  posts: PostsSkeleton,
  profileInfo: ProfileInfoSkeleton,
};

interface LoadingHandlerProps {
  status: "pending" | "success" | "error";
  error?: string;
  children: ReactNode;
  type?: keyof typeof loadingMap;
}

const LoadingHandler = ({
  status,
  error,
  children,
  type = "spinner",
}: LoadingHandlerProps) => {
  const Component = loadingMap[type];

  if (status === "pending") {
    return <Component />;
  }
  if (status === "error") {
    return <LottieHandler type="error" message={error} />;
  }
  return <>{children}</>;
};
export default LoadingHandler;
