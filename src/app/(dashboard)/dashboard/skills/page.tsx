"use client";
import AppHeader from "@/components/Dashboard/app-header";
import Form from "@/components/Form/Form";
import InputBox from "@/components/Form/InputBox";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cat, Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import CreateCategory from "./CreateCategory";
import CreateSkill from "./CreateSkill";
import CategoriesList from "./CategoriesList";
import SkillsList from "./SkillsList";

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
            <CreateSkill />
            <CreateCategory />
          </div>
        </div>
        <CategoriesList />
        <SkillsList />
      </div>
    </div>
  );
};

export default Skills;
