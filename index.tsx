import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/home/HomePage";
import OrderPage from "./src/pages/order/OrderPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/printing-tracker/" element={<HomePage />} />
        <Route path="/printing-tracker/order/:order_id" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
