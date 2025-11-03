import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./views/home/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTodo from "./views/createTodo/CreateTodo.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTodo />} />
    </Routes>
  </BrowserRouter>
);
