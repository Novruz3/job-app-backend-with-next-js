import React from "react";

const EmployeForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <div className="w-1/3">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="carrier">Carrier Objective</label>
        <textarea
          id="carrier"
          className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default EmployeForm;
