import {object, string} from "yup";

const registerSchemaValidation = object({
  username: string()
    .required("Username is required")
    .min(3, "Username minimum length 3 characters long")
    .max(30, "Username maximum length 30 characters long"),
  email: string().required("Email is required").email(),
  password: string()
    .required("Password is required")
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long"),
});
export default registerSchemaValidation;
