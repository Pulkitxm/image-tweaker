import { Link } from "react-router-dom";
import AuthGraphic from "../../assets/AuthGraphic";
import { useCookies } from "react-cookie";
import Alert from "../../assets/Alert";

export default function Layout({ formUI }: { formUI: JSX.Element }) {
  const [{ token }, _, removeCookies] = useCookies(["token"]);
  function logOut() {
    removeCookies("token");
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[50%] h-screen hidden lg:flex justify-center items-center">
        <AuthGraphic />
      </div>
      {token && (
        <div className="absolute right-0 z-10 w-full lg:w-[50%] h-screen flex flex-col justify-center items-center text-2xl lg:text-3xl font-bold underline">
          <Link to={"/dashboard"} className="flex justify-center">
            <Alert /> You are already logged in, go to dashboard
          </Link>
          <button onClick={logOut}>Logout</button>
        </div>
      )}
      <div
        className={`w-full lg:w-[50%] h-screen flex flex-col justify-center items-center bg-white ${
          token ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Log in
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          {formUI}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/register" className="text-black hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
