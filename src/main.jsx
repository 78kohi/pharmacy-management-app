import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Inventory from "./pages/Inventory";
import Pos from "./pages/Pos";
import { SalesProvider } from "./hooks/use-sales";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SalesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="pos" element={<Pos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SalesProvider>
  </StrictMode>
);
