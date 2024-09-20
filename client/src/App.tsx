import Pages from "./pages";
import "./index.css";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "./state/token";

export default function App() {
  const setToken = useSetRecoilState(tokenState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token ?? undefined);
  }, [setToken]);
  return <Pages />;
}
