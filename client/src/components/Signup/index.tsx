import useForm from "useeform";
import axios from "axios";
import { z } from "zod";
import { BACKEND_API_BASE_URL } from "../../config";
import Loader from "../../assets/Loader";
import Layout from "./Layout";

export default function Login() {
  const formSchemaZod = {
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  };
  const { formUI } = useForm({
    name: "test",
    className:
      "inline-flex flex-col justify-center items-center space-y-4 w-full bg-transparent w-full",
    preventDefault: true,
    onSubmit: async (event, values) => {
      event.preventDefault();
      const res = await axios.post(
        BACKEND_API_BASE_URL + "/api/auth/login",
        values,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
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
        },
      },
      {
        formElement: "label",
        name: "label-email",
        className: "block text-sm font-medium text-gray-700 w-full",
        value: "Email",
        children: {
          formElement: "input",
          type: "email",
          name: "email",
          className:
            "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 w-full",
          zodValidation: formSchemaZod.email,
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
        },
      },
      {
        formElement: "button",
        type: "submit",
        name: "submit",
        className:
          "w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300",
        value: "Sign Up",
        autoFocus: false,
        disabled: false,
        loading: true,
        loadingComponent: <Loader />,
      },
    ],
  });
  return <Layout formUI={formUI} />;
}
