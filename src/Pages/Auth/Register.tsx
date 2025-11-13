import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/service/apiSlice";
import { useTranslation } from "react-i18next";
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
    name: "name",
    label: "Username",
    placeholder: "Enter your username",
    type: "text",
    className: "",
    wrapperClassName: "mb-6",
    validation: yup.string().required("Username is required"),
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "text",
    className: "",
    wrapperClassName: "mb-6",
    validation: yup.string().email("Invalid email").required("Email is required"),
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    validation: yup.string().required("Password is required"),
  },
  {
    name: "acceptTerms",
    label: (
      <span className="text-sm leading-5 mb-[40px] ml-2 rtl:mr-2 font-medium">
        I agree to{" "}
        <UIButton variant="link" className="p-0">
          Terms and Conditions
        </UIButton>
      </span>
    ),
    placeholder: "I agree to Terms and Conditions",
    type: "checkbox",
    fieldWrapperClassName: "mb-[40px] col-span-6",
  },
];

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();

  const onSubmit = async (data: RegisterFormValues) => {
    const { email, password, name, acceptTerms } = data;
    const password_confirmation = password;

    if (acceptTerms) {
      try {
        const response = await register({ email, password, name, password_confirmation }).unwrap();
        console.log("Registration successful:", response);
        navigate("/auth/login");
      } catch (err) {
        setApiErrors(err.data?.errors || { register: "Registration failed!" });
      }
    } else {
      setApiErrors({ acceptTerms: "You must accept the Terms and Conditions" });
    }
  };

  return (
    <AuthWrapper title="Sign Up">
      <DynamicForm<RegisterFormValues>
        fields={fields}
        onSubmit={onSubmit}
        apiErrors={apiErrors}
        buttonConfig={{
          label: isLoading ? <Spinner /> : t("Sign Up"),
          type: "submit",
          className: `w-full h-[50px] flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`,
          disabled: isLoading,
        }}
      />
      <p className="mt-6">
        {t("Already have an Account?")}{" "}
        <UIButton variant="link" className="p-0" onClick={() => navigate("/auth/login")}>
          {t("Sign In")}
        </UIButton>
      </p>
    </AuthWrapper>
  );
}
