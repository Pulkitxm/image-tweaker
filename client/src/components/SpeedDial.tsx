import { useState } from "react";
import { Link } from "react-router-dom";
import { IconBxHomeCircle, IconDashboardLine } from "../assets/Speedial";

export default function DefaultSpeedDial() {
  const [show, setshow] = useState(false);
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
      icon: <IconDashboardLine />,
      link: "/dashboard",
      title: "Dashboard",
    },
  ];
  return (
    <div
      className="absolute right-6 bottom-6 group z-50 speeddial-button"
      onMouseLeave={() => setshow(false)}
    >
      <div
        id="speed-dial-menu-default"
        className={`speed-dial-menu flex flex-col items-center mb-4 space-y-2 ${
          show ? "" : "hidden"
        }`}
      >
        {items.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            type="button"
            className="flex justify-center items-center w-16 h-16 text-gray-900 hover:text-gray-900 bg-white rounded-full border border-gray-300 shadow-sm hover:bg-gray-50  focus:outline-none relative"
            title={item.title}
          >
            {item.icon}
          </Link>
        ))}
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
