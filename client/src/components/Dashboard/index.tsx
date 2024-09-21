import Images from "./Images";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../state/token";

export default function Dashboard() {
  const token = useRecoilValue(tokenState);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    setNavHeight(document.getElementsByTagName("nav")[0].clientHeight);
  }, []);
  return (
    <div
      className="h-screen overflow-y-auto"
      style={{
        paddingTop: token ? navHeight : 0,
      }}
    >
      {token ? (
        <>
          <div className="w-full flex justify-center items-center mt-3 opacity-75">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
            </svg>
            Right click on an image to edit
          </div>
          <Images />
        </>
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
