import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import { Popover, PopoverHandler } from "@material-tailwind/react";
import { User } from "./User";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ token }, _, removeCookie] = useCookies(["token"]);
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  return (
    <nav className="fixed top-0 right-0 w-screen h-18 bg-black flex justify-between items-center px-4 lg:px-10 py-3 text-xl">
      <Link to="/" className="text-primary text-xl md:text-2xl">
        ImageTweaker
      </Link>
      {token ? (
        <Popover open={openPopover} handler={setOpenPopover}>
          <PopoverHandler {...triggers}>
            <svg
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8 cursor-pointer"
            >
              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
            </svg>
          </PopoverHandler>
          <User triggers={triggers} removeCookie={removeCookie} />
        </Popover>
      ) : (
        <div className="flex space-x-1 text-base md:text-lg">
          <NavLink to="/login" className="text-white font-semibold">
            Login
          </NavLink>
          <p className="text-white font-semibold">/</p>
          <NavLink to="/login" className="text-white font-semibold">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
