import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import auth from "./Auth";
import Dashboard from "../components/Dashboard";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={auth("login")} />
      <Route path="/register" element={auth("signup")} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
