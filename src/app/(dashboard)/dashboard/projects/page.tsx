"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddProject from "./AddProject";

const Projects = () => {
  return (
    <div>
      <AppHeader pageName="Projects" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Projects</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddProject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
