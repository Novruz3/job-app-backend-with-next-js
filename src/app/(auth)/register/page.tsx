"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { IRegisterFormData } from "@/interfaces/auth/IRegister";
import { ILoaderState } from "@/interfaces/redux/ILoaderState";
import { setLoading } from "@/redux/loaderSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const loading = useSelector(
    (state: { loaders: ILoaderState }) => state?.loaders?.loading
  );
  const [data, setData] = useState<IRegisterFormData>({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    userType: "employee",
  });

  const selectType = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      userType: e.target.value as "employee" | "employer",
    });
  };

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
      const res: any = await axios.post("/api/users/register", data);
      if (res.data.success) {
        toast({
          description: res.data.message,
        });
        router.push("/login");
      }
      setData({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        userType: "employee",
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
        <p className="text-2xl font-bold">Job App - Register</p>
        <hr className="mt-2" />
        <fieldset>
          <p className="mt-1 text-sm/6 text-gray-600">Register as</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-x-3">
              <input
                id="employer"
                name="employer"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value="employer"
                onChange={selectType}
              />
              <label
                htmlFor="employer"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Employer
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="employee"
                name="employee"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value="employee"
                onChange={selectType}
              />
              <label
                htmlFor="employee"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Employee
              </label>
            </div>
          </div>
        </fieldset>
        <div className="mt-4">
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleInput}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
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
          {loading ? "Loading..." : "Register"}
        </button>
        <p
          className="mt-4 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;
