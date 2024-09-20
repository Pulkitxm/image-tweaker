import { PopoverContent } from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../state/token";

export function User({
  triggers,
}: {
  triggers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}) {
  const setCookie = useSetRecoilState(tokenState);
  function logOut() {
    setCookie("");
    localStorage.removeItem("token");
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
