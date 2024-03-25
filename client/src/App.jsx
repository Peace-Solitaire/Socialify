import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import AboutPage from "./pages/aboutPage/AboutPage";
import SupportPage from "./pages/supportPage/SupportPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./pages/profilePage/ProfilePage";
function App() {
   const mode = useSelector((state) => state.user.mode);
   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ThemeProvider theme={theme}>
          <CssBaseline />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <SupportPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
