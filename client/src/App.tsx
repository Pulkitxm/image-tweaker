import Pages from "./pages";
import "./index.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Navbar />
      <Pages />
      <Toaster />
    </>
  );
}
