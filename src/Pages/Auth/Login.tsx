import * as yup from "yup";

import AuthWrapper from "./Wrapper";
import DynamicForm from "@/UI/Form/DynamicForm";
import UIButton from "@/UI/Elements/Button";
import { loginSuccess } from "@/slice/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/service/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorToaster, SuccessToaster } from "@/UI/Elements/Toast";
import { Spinner } from "@/UI/Elements/Spinner"; // Import a spinner component

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "text",
    wrapperClassName: "mb-6",
    validation: yup.string().email("Invalid email").required("Email is required"),
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

  const buttonConfig = {
    label: isLoading ? "Processing..." : "Sign In",
    type: "submit",
    className: `w-full h-[50px] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`,
    disabled: isLoading, // Disable button while processing
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data).unwrap();
      console.log("Login Response", response);
      
      localStorage.setItem("email", data.email);
      dispatch(loginSuccess(response.token));
      localStorage.setItem("role", response?.user.role);
      navigate("/");
    } catch (err) {
      ErrorToaster(err.data.message);
      setApiErrors(err.data.message);
    }
  };

  return (
    <AuthWrapper title={"Sign In"}>
      <DynamicForm<LoginFormValues>
        fields={fields}
        onSubmit={onSubmit}
        buttonConfig={buttonConfig}
        loading={isLoading}
        apiErrors={apiErrors}
      />
      
      {/* Show a spinner when logging in */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Spinner className="w-6 h-6 text-blue-500" /> 
        </div>
      )}

      <p className="mt-6">
        {"Don't Have an Account?"}
        <UIButton
          variant="link"
          className="p-0"
          onClick={() => navigate("/auth/register")}
        >
          {"Sign Up"}
        </UIButton>
      </p>
    </AuthWrapper>
  );
}
