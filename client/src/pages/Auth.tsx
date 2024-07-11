import Login from "../components/Login";
import Signup from "../components/Signup";

export default function auth(type: "login" | "signup") {
  if (type === "login") {
    return <Login />;
  } else {
    return <Signup />;
  }
}
