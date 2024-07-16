import { PopoverContent } from "@material-tailwind/react";
import { CookieSetOptions } from "universal-cookie";

export function User({
  triggers,
  removeCookie,
}: {
  triggers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  removeCookie: (name: "token", options?: CookieSetOptions) => void;
}) {
  function logOut() {
    removeCookie("token", {
      path: "/",
    });
  }
  return (
    // @ts-expect-error This is a popover content
    <PopoverContent
      {...triggers}
      className="z-50 max-w-[24rem] px-10 py-5 bg-white rounded-lg shadow-custom hover:bg-gray-200 cursor-pointer"
      onClick={logOut}
    >
      Logout
    </PopoverContent>
  );
}
