"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";

const Certifications = () => {
  return (
    <div>
      <AppHeader pageName="Certifications" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Certifications</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            {/* <AddExperience /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
