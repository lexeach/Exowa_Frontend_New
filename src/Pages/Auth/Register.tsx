import * as yup from 'yup';

import AuthWrapper from './Wrapper';
import DynamicForm from '@/UI/Form/DynamicForm';
import UIButton from '@/UI/Elements/Button';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/service/apiSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const fields = [
  {
    name: 'name',
    label: 'username',
    placeholder: 'Username',
    type: 'text',
    className: '',
    wrapperClassName: 'mb-6',
    validation: yup.string().required('Username is required'),
  },
  {
    name: 'email',
    label: 'email',
    placeholder: 'Email',
    type: 'text',
    className: '',
    wrapperClassName: 'mb-6',
    validation: yup.string().email('invalid_email').required('email_required'),
  },
  {
    name: 'password',
    label: 'password',
    placeholder: 'Password',
    type: 'password',
    validation: yup.string().required('password_required'),
  },
  {
    name: 'acceptTerms',
    label: (
      <span className="text-sm leading-5 mb-[40px] ml-2 rtl:mr-2 font-medium">
        I agree to{' '}
        <UIButton variant="link" className="p-0">
          Terms and Conditions
        </UIButton>{' '}
      </span>
    ),
    placeholder: 'I agree to Terms and Conditions',
    type: 'checkbox',
    fieldWrapperClassName: 'mb-[40px] col-span-6',
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

  const buttonConfig = {
    label: t('Sign Up'),
    type: 'submit',
    className: 'w-full h-[50px]',
  };

  const onSubmit = async data => {
    const { email, password, name, acceptTerms } = data;
    console.log(data);
    const password_confirmation = password;
    if (acceptTerms) {
      try {
        const response = await register({
          email,
          password,
          name,
          password_confirmation,
        }).unwrap();
        console.log(response);
        navigate('/auth/login');
      } catch (err) {
        setApiErrors(err.data.errors);
      }
    }
  };
  return (
    <AuthWrapper title="Sign up">
      <DynamicForm<RegisterFormValues>
        fields={fields}
        onSubmit={onSubmit}
        buttonConfig={buttonConfig}
        loading={isLoading}
        apiErrors={apiErrors}
      />
      <p className="mt-6">
        {t('Already have an Account')}{' '}
        <UIButton
          variant="link"
          className="p-0"
          onClick={() => navigate('/auth/login')}
        >
          {t('Sign In')}
        </UIButton>
      </p>
    </AuthWrapper>
  );
}
