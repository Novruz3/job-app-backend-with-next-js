"use client";
import EmployeForm from "@/components/EmployeForm";
import EmployerForm from "@/components/EmployerForm";
import { IUserState } from "@/interfaces/redux/IUserState";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector(
    (state: { users: IUserState }) => state?.users?.currentUser
  );
  return (
    <form className="w-full">
      <p className="text-2xl font-semibold mb-2">Profile</p>
      <hr className="mb-4" />
      {currentUser && currentUser?.userType === "employee" ? (
        <EmployeForm />
      ) : currentUser?.userType === "employer" ? (
        <EmployerForm />
      ) : (
        <div>Loading...</div>
      )}
    </form>
  );
};

export default Profile;
