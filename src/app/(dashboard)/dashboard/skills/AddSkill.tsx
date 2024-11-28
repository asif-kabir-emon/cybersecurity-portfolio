import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { SkillSchema } from "@/schema/skill.schema";
import SelectBox from "@/components/Form/SelectBox";
import { Skill_Level } from "@/constants";
import {
  useAddSkillMutation,
  useGetCategoriesQuery,
} from "@/redux/api/skillApi";
import { toast } from "sonner";

const AddSkill = () => {
  const [open, setOpen] = React.useState(false);

  const { data: categories, isLoading: categoriesFetching } =
    useGetCategoriesQuery({});
  const Skill_Category =
    categories?.data?.map((category: { name: string; id: string }) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const [addSkill, { isLoading: isCreating }] = useAddSkillMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to add new Skill.", {
      position: "top-center",
    });
    console.log(data);
    try {
      const response = await addSkill(data).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Skill added successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to add skill. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to add skill. Please try again.", {
        id: toastId,
      });
    }
  };
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
        title="Add Skill"
        description="Create a new Skill under a category. For example, you can create a skill called 'React' under 'Front-End' category."
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(SkillSchema)}
            defaultValues={{
              categoryId: "",
              name: "",
              level: "",
            }}
          >
            <div className="flex flex-col gap-3">
              <InputBox
                name="name"
                label="Skill Name"
                placeholder="Enter skill name"
                required={true}
              />
              <SelectBox
                name="categoryId"
                label="Skill Category"
                placeholder="Enter skill category"
                items={Skill_Category}
                required={true}
                disabled={categoriesFetching}
              />
              <SelectBox
                name="level"
                label="Skill Level"
                placeholder="Select experience level"
                items={Skill_Level}
                required={true}
              />
            </div>
            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={categoriesFetching || isCreating}
            >
              Save
            </Button>
          </Form>
        </div>
      </DrawerDialog>
    </div>
  );
};

export default AddSkill;
