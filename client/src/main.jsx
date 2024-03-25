import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </SnackbarProvider>
);
