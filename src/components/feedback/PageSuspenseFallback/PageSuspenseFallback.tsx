import { ReactNode, Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallback = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="Loading, please wait..." />
      }
    >
      {children}
    </Suspense>
  );
};
export default PageSuspenseFallback;
