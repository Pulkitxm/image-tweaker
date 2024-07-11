import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import auth from "./Auth";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={auth("login")} />
      <Route path="/register" element={auth("signup")} />
    </Routes>
  );
}
