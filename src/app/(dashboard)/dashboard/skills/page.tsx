"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import { FieldValues } from "react-hook-form";
import CategoriesList from "./CategoriesList";
import SkillsList from "./SkillsList";
import AddCategory from "./AddCategory";
import AddSkill from "./AddSkill";

const Skills = () => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {};

  return (
    <div>
      <AppHeader pageName="Skills" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-3xl">Skills</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddCategory />
            <AddSkill />
          </div>
        </div>
        <CategoriesList />
        <SkillsList />
      </div>
    </div>
  );
};

export default Skills;
