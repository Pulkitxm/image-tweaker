import { Routes, Route } from "react-router-dom";
import auth from "./Auth";
import Dashboard from "../components/Dashboard";
import SpeedDial from "../components/SpeedDial";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import UploadDialog from "../components/Upload";
import DeleteImage from "../components/DeleteImage";
import EditImage from "../components/EditImage";
import NotFound from "./NotFound";

export default function Pages() {
  return (
    <>
      <Navbar />
      <UploadDialog />
      <DeleteImage />
      <Routes>
        <Route path="/login" element={auth("login")} />
        <Route path="/register" element={auth("signup")} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:imageId" element={<EditImage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <SpeedDial />
      <Toaster />
    </>
  );
}
