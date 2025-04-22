// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//App
import AppRouter from "./routes/AppRouter.tsx";

//Store
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

//Styles
import "./styles/global.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
