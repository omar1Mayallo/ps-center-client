import {object, string} from "yup";

const loginSchemaValidation = object({
  email: string().required("Email is required").email(),
  password: string()
    .required("Password is required")
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long"),
});

export default loginSchemaValidation;
