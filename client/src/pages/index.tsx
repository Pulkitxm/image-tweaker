import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import auth from "./Auth";
import Dashboard from "../components/Dashboard";
import SpeedDial from "../components/SpeedDial";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import UploadDialog from "../components/Upload";
import DeleteImage from "../components/DeleteImage";
import NotFound from "./NotFound";

export default function Pages() {
  return (
    <>
      <Navbar />
      <UploadDialog />
      <DeleteImage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={auth("login")} />
        <Route path="/register" element={auth("signup")} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <SpeedDial />
      <Toaster />
    </>
  );
}
