import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { skillCategorySchema } from "@/schema/skill-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";

const CreateSkill = () => {
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {};
  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Skills
      </Button>
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        title="Create Skill Category"
        description="Skill's categories refers to which category belongs to skills. For example, if you have a skill called 'React', you can categorize it under 'Frontend' category."
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(skillCategorySchema)}
            defaultValues={{
              name: "",
            }}
          >
            <InputBox
              name="name"
              label="Category Name"
              placeholder="Enter skill category name"
              required={true}
            />
            <Button type="submit" className="mt-5 w-full">
              Save
            </Button>
          </Form>
        </div>
      </DrawerDialog>
    </div>
  );
};

export default CreateSkill;
