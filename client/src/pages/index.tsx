import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import auth from "./Auth";
import Dashboard from "../components/Dashboard";
import Upload from "../components/Upload";
import SpeedDial from "../components/SpeedDial";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Pages() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={auth("login")} />
        <Route path="/register" element={auth("signup")} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/upload" element={<Upload />} />
      </Routes>
      <SpeedDial />
      <Toaster />
    </>
  );
}
