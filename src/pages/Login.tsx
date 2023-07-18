/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useSignInMutation } from "../redux/features/users/usersApi";
import { setLoading } from "../redux/features/users/usersSlice";
import swal from "sweetalert";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [signInMutation] = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credential = { email, password };
      dispatch(setLoading(true));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await signInMutation(credential);
      console.log(response);
      if (response.data) {
        // swal(response?.data?.message, "", "success");
        Cookies.set('token', response?.data?.token);
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        swal(response?.error?.data?.message, "", "error");
      }
      dispatch(setLoading(false));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Sign-in failed:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/images/login.jpg')"
        }}
        
      >
        <div className="bg-white w-[800px] shadow-md rounded-lg p-8 flex">
          <div className="w-1/2 flex items-center justify-center">
            <div>
              <div className="text-center mb-4">
                <img
                  height="65px"
                  width="65px"
                  className="mx-auto"
                  src="https://i.ibb.co/SsvvHhx/login.jpg"
                  alt="logo"
                />
              </div>
              <p className="text-center text-gray-700 text-lg mb-4">
                Login to discover
                <br /> ❤ <br /> share your books!
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Log In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Login
                </button>
              )}
              <p className="text-gray-700 text-md mt-4">
                have not account?{" "}
                <Link to="/signup">
                  <a className="text-indigo-500 font-semibold hover:text-indigo-700">
                    Sign Up
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
