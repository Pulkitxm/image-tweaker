import { useCookies } from "react-cookie";
import Images from "./Images";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [{ token }] = useCookies(["token"]);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    setNavHeight(document.getElementsByTagName("nav")[0].clientHeight);
  }, []);
  return (
    <div
      className="h-screen"
      style={{
        paddingTop: token ? navHeight : 0,
      }}
    >
      {token ? (
        <Images />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex space-x-4 mt-4">
              <Link to={"/login"}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
