"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { ILoginFormData } from "@/interfaces/auth/ILogin";
import { ILoaderState } from "@/interfaces/redux/ILoaderState";
import { setLoading } from "@/redux/loaderSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const loading = useSelector(
    (state: { loaders: ILoaderState }) => state?.loaders?.loading
  );
  const [data, setData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res: any = await axios.post("/api/users/login", data);
      if (res.data.success) {
        router.push("/");
      }
      setData({
        email: "",
        password: "",
      });
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={sendData}
        className="bg-white p-4 rounded-lg sm:w-96 h-auto"
      >
        <p className="text-2xl font-bold">Job App - Login</p>
        <hr className="mt-2" />
        <div className="mt-2">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInput}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleInput}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <button
          disabled={loading ? true : false}
          type="submit"
          className="rounded-md mt-8 w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p
          className="mt-4 cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Dont have an account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;
