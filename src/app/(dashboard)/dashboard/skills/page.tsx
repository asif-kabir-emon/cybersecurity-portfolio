"use client";
import AppHeader from "@/components/Dashboard/app-header";
import Form from "@/components/Form/Form";
import InputBox from "@/components/Form/InputBox";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { skillCategorySchema } from "@/schema/skill-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import CreateSkill from "./CreateSkill";

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
            {/* <Button
              className="rounded-2xl text-sm py-0"
              onClick={() => setOpen(true)}
            >
              <Plus /> Add Skills
            </Button> */}
            <CreateSkill />
            <Button className="rounded-2xl text-sm py-0">
              <Plus /> Add Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
