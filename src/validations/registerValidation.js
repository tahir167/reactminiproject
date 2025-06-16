import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),

  profileImg: Yup.string()
    .url("Must be a valid URL")
    .required("Profile image URL is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10,14}$/, "Phone number must be between 10 and 14 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(/[\W_]/, "Must contain at least one special character"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  balance: Yup.number()
    .typeError("Balance must be a number")
    .min(0, "Balance cannot be negative")
    .required("Balance is required"),
});

export default registerValidationSchema;
