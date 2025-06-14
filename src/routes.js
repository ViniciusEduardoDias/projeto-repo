import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repo from "./pages/Repositorio";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/repo" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}
