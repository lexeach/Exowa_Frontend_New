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


const fields = [
  {
    name: "email",
    label: "email",
    placeholder: "email",
    type: "text",
    wrapperClassName: "mb-6",
    validation: yup.string().email("invalid_email").required("email_required"),
    fieldWrapperClassName: "col-span-6",
  },
  {
    name: "password",
    label: "password",
    placeholder: "password",
    type: "password",
    validation: yup.string().required("password_required"),
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
    label: "Sign In",
    type: "submit",
    className: "w-full h-[50px]",
  };


  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await login({ email, password }).unwrap();
      console.log('login response', response);
      
      localStorage.setItem('email', email);
      dispatch(loginSuccess(response.token));
      localStorage.setItem('role', response?.user.role);
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
      <p className="mt-6">
        {"Don't Have an Account"}
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
