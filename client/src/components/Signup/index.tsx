import useForm from "useeform";
import axios from "axios";
import { z } from "zod";
import Loader from "../../assets/Loader";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../lib/constants";

export default function Login() {
  const navigate = useNavigate();
  const formSchemaZod = {
    username: z.string().min(1),
    password: z.string().min(8),
    email: z.string().email(),
  };
  const { formUI } = useForm({
    name: "test",
    className:
      "inline-flex flex-col justify-center items-center space-y-4 w-full bg-transparent w-full",
    onSubmit: async (event, values, errors, zodErrors) => {
      event.preventDefault();
      const { username, password, email } = values;

      if ((password as string).length < 8)
        return toast.error("Password must be at least 8 characters long");
      if ((username as string).length <= 1)
        return toast.error("Username must be at least 1 character long");
      if ((email as string).length <= 1)
        return toast.error("Email must be at least 1 character long");

      if (zodErrors.length != 0 || errors.length != 0)
        return toast.error("Invalid credentials");

      toast.promise(
        axios.post(BACKEND_URL + "/api/auth/register", values, {
          withCredentials: true,
        }),
        {
          loading: "Logging in...",
          success: () => {
            navigate("/login");
            return "Logged in successfully";
          },
          error: (err) => {
            if (err.response.data.message) return err.response.data.message;
            return "Internal Server Error";
          },
        },
        {
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }
      );
    },
    children: [
      {
        formElement: "label",
        name: "label-username",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Username",
        children: {
          formElement: "input",
          type: "text",
          name: "username",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.username,
          required: true,
        },
      },
      {
        formElement: "label",
        name: "label-email",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Email",
        children: {
          formElement: "input",
          type: "text",
          name: "email",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.email,
          required: true,
        },
      },
      {
        formElement: "label",
        name: "label-password",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Password",
        children: {
          formElement: "input",
          type: "password",
          name: "password",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.password,
          required: true,
        },
      },
      {
        formElement: "button",
        type: "submit",
        name: "submit",
        loading: true,
        loadingComponent: <Loader />,
        className:
          "w-full bg-black text-white p-2 rounded-md hover:bg-gray-800",
        value: "Log In",
        autoFocus: false,
        disabled: false,
      },
    ],
  });
  return <Layout formUI={formUI} />;
}
