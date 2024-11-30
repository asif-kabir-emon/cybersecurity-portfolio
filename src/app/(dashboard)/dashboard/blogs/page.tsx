"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddBlog from "./AddBlog";

const Blogs = () => {
  return (
    <div>
      <AppHeader pageName="Blogs" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Blogs</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddBlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
