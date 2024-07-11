import { z } from "zod";
import { FormSchema } from "useeform";

const formSchemaZod = {
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
};

const Options: FormSchema = {
  name: "test",
  className:
    "inline-flex flex-col justify-center items-center space-y-4 w-full bg-transparent w-full",
  preventDefault: true,
  onSubmit: (_, values, errors, zodErrors) => {
    console.log({
      values,
      errors,
      zodErrors,
    });
    if (errors.length) return console.log("Form has errors", errors);
    if (zodErrors.length)
      return console.log(
        "Form has Zod errors",
        zodErrors.map((error) => error.issues)
      );
    console.log("Form submitted", values);
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
    },
  ],
};
export default Options;
