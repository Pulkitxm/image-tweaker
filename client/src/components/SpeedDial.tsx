import { useState } from "react";
import { Link } from "react-router-dom";
import { IconBxHomeCircle, IconLogout, IconUpload } from "../assets/Speedial";
import { useSetRecoilState } from "recoil";
import { openUploadDialogState } from "../state/image";
import { useCookies } from "react-cookie";

export default function DefaultSpeedDial() {
  const [_, __, removeCookies] = useCookies(["token"]);
  const [show, setshow] = useState(false);
  const setOpenUploadDialogState = useSetRecoilState(openUploadDialogState);
  function toggleShow() {
    setshow(!show);
  }
  const items = [
    {
      icon: <IconBxHomeCircle />,
      link: "/",
      title: "Home",
    },
    {
      icon: <IconUpload />,
      onClick: () => setOpenUploadDialogState(true),
      title: "Uplaod Image",
    },
    {
      icon: <IconLogout />,
      onClick: () => removeCookies("token"),
      title: "Logout",
    },
  ];
  return (
    <div
      className="fixed right-6 bottom-6 group z-10 speeddial-button"
      onMouseLeave={() => setshow(false)}
    >
      <div
        id="speed-dial-menu-default"
        className={`speed-dial-menu flex flex-col items-center mb-4 space-y-2 ${
          show ? "" : "hidden"
        }`}
      >
        {items.map((item, index) => {
          const props = {
            className:
              "flex justify-center items-center w-16 h-16 text-gray-900 hover:text-gray-900 bg-white rounded-full border border-gray-300 shadow-sm hover:bg-gray-50  focus:outline-none relative",
            title: item.title,
          };
          return item.link ? (
            <Link to={item.link} {...props} key={index}>
              {item.icon}
            </Link>
          ) : (
            item.onClick && (
              <button {...props} onClick={item.onClick} key={index}>
                {item.icon}
              </button>
            )
          );
        })}
      </div>
      <button
        type="button"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-indigo-600 rounded-full w-16 h-16 hover:bg-indigo-700"
        onClick={toggleShow}
        onMouseEnter={() => setshow(true)}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}
