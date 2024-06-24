import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "./Inputbox";
import axios from "axios";
import { BACKEND_URL } from "../config";

// TODO trpc
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState({
    name: "",
    password: "",
    email: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("The request failed please refresh the page");
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className=" flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className=" text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className=" underline pl-2"
              >
                {type === "signin" ? "Signup" : "Login"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <InputBox
                label="Name"
                placeholder="John Doe"
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <InputBox
              label="Email"
              placeholder="johndoe@email.com"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <InputBox
              label="Password"
              placeholder=""
              type={"password"}
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
