// import * as yup from "yup";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginSuccess } from "@/slice/authSlice";
// import { useLoginMutation } from "@/service/apiSlice";
// import { ErrorToaster } from "@/UI/Elements/Toast";
// import AuthWrapper from "./Wrapper";
// import DynamicForm from "@/UI/Form/DynamicForm";
// import UIButton from "@/UI/Elements/Button";

// // Spinner Component
// const Spinner = () => (
//   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
// );

// // Form Fields
// const fields = [
//   {
//     name: "email",
//     label: "user id",
//     placeholder: "Enter your user id",
//     type: "text",
//     wrapperClassName: "mb-6",
//     validation: yup
//       .string()
//       // .email("Invalid email")
//       .required("user id is required"),
//     fieldWrapperClassName: "col-span-6",
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     type: "password",
//     validation: yup.string().required("Password is required"),
//     fieldWrapperClassName: "col-span-6",
//   },
// ];

// type LoginFormValues = {
//   email: string;
//   password: string;
// };



// export default function Login() {
//   const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const onSubmit = async (data: LoginFormValues) => {
//   //   const { email, password } = data;
//   //   try {
//   //     const response = await login({ email, password }).unwrap();

//   //     console.log("Login response:", response);

//   //     localStorage.setItem("email", email);
//   //     dispatch(loginSuccess(response.token));
//   //     localStorage.setItem("role", response?.user.role);
//   //     navigate("/");
//   //   } catch (err) {
//   //     ErrorToaster(err.data?.message || "Login failed!");
//   //     setApiErrors({ login: err.data?.message || "Invalid credentials" });
//   //   }
//   // };

//   return (
//     <AuthWrapper title="Sign In">
//       <DynamicForm<LoginFormValues>
//         fields={fields}
//         onSubmit={onSubmit}
//         apiErrors={apiErrors}
//         buttonConfig={{
//           label: isLoading ? <Spinner /> : "Sign In",
//           type: "submit",
//           className: "w-full h-[50px] flex items-center justify-center",
//           disabled: isLoading,
//         }}
//       />
//       {/* <p className="mt-6">
//         Don't Have an Account?{" "}
//         <UIButton
//           variant="link"
//           className="p-0"
//           onClick={() => navigate("/auth/register")}
//         >
//           Sign Up
//         </UIButton>
//       </p> */}
//     </AuthWrapper>
//   );
// }


import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "@/slice/authSlice";
import { useLoginMutation } from "@/service/apiSlice";
import { ErrorToaster } from "@/UI/Elements/Toast";
import AuthWrapper from "./Wrapper";
import DynamicForm from "@/UI/Form/DynamicForm";
import UIButton from "@/UI/Elements/Button";

// Spinner Component
const Spinner = () => (
  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
);

// Form Fields
const fields = [
  {
    name: "email",
    label: "user id",
    placeholder: "Enter your user id",
    type: "text",
    wrapperClassName: "mb-6",
    validation: yup.string().required("user id is required"),
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    validation: yup.string().required("Password is required"),
    fieldWrapperClassName: "col-span-6",
  },
];

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    try {
      const response = await login({ email, password }).unwrap();

      console.log("Login response:", response);

      localStorage.setItem("email", email);
      dispatch(loginSuccess(response.token));
      localStorage.setItem("role", response?.user.role);
      navigate("/");
    } catch (err) {
      ErrorToaster(err.data?.message || "Login failed!");
      setApiErrors({ login: err.data?.message || "Invalid credentials" });
    }
  };

  return (
    <AuthWrapper title="Sign In">
      <DynamicForm<LoginFormValues>
        fields={fields}
        onSubmit={onSubmit}
        apiErrors={apiErrors}
        buttonConfig={{
          label: isLoading ? <Spinner /> : "Sign In",
          type: "submit",
          className: "w-full h-[50px] flex items-center justify-center",
          disabled: isLoading,
        }}
      />
       
          <p className="mt-6">
            Don't Have an Account?{" "}
            <UIButton
              variant="link"
              className="p-0"
              onClick={() => navigate("https://user.exowa.click/registration")}
            >
              Sign Up
            </UIButton>
          </p>
    </AuthWrapper>
  );
}
