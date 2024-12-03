"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";

const Contacts = () => {
  return (
    <div>
      <AppHeader pageName="Contacts" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Education</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            {/* <AddEducation /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
