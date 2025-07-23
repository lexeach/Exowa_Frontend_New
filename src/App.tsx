import "./App.css";
import "./index.css";

import { RouterProvider, createHashRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./Pages/Layout";
import Login from "./Pages/Auth/Login";
import Logo from "./UI/Container/Logo";
import ProtectedRoute from "./routes/protected";
import Register from "./Pages/Auth/Register";
import { RootState } from "./store";
import Paper from "./Pages/Paper/index";
import PaperView from "./Pages/Paper/view";
import Children from "./Pages/Children";
import Subject from "./Pages/Subject";
import Syllabus from "./Pages/Syllabus";
import Answer from "./Pages/Answer";
import Dashboard from "./Pages/Dashboard";
import { loadTokenFromStorage } from "./slice/authSlice";
import { useEffect } from "react";

import ResultView from "./Pages/Paper/AnswerView";
import OtpExpire from "./Pages/Answer/expireOTP";
import ThankYouPage from "./Pages/Answer/thankyou";
import LogOut from "./Pages/Auth/LogOut";
import AnswerByStudent from "./Pages/Answer/answerByStudent";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "papers",
            element: <Paper />,
          },
             {
            path: "student-answer/:id",
            element: <AnswerByStudent />,
          },
          {
            path: "papers/:id",
            element: <PaperView />,
          },
          {
            path: "children",
            element: <Children />,
          },
          {
            path: "subject",
            element: <Subject />,
          },
          {
            path: "syllabus",
            element: <Syllabus />,
          },
          {
            path: "*",
            element: <Dashboard />,
          },
          {
            path: "logout",
            element: <LogOut />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "answer/:id",
        element: <Answer />,
      },
      {
        path: "result/:id",
        element: <ResultView />,
      },
      {
        path: "otp-expire",
        element: <OtpExpire />,
      },
      {
        path: "thankyou",
        element: <ThankYouPage />,
      },
    ],
  },
  {
    path: "/thankyou",
    element: <ThankYouPage />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  if (loading) {
    return <Logo />;
  }

  return <RouterProvider router={router} />;
}
