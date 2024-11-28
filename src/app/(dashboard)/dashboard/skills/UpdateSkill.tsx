import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { SkillCategorySchema } from "@/schema/skill-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import {
  useGetCategoriesQuery,
  useUpdateSkillMutation,
} from "@/redux/api/skillApi";
import { toast } from "sonner";
import SelectBox from "@/components/Form/SelectBox";
import { Skill_Level } from "@/constants";
import { SkillSchema } from "@/schema/skill.schema";

const UpdateSkill = ({
  skillId,
  skillName,
  skillLevel,
  skillCategory,
}: {
  skillId: string;
  skillName: string;
  skillLevel: string;
  skillCategory: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const { data: categories, isLoading: categoriesFetching } =
    useGetCategoriesQuery({});
  const Skill_Category = categories?.data.map(
    (category: { name: string; id: string }) => ({
      label: category.name,
      value: category.id,
    }),
  );

  const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to update skill.", {
      position: "top-center",
    });
    console.log(data);
    try {
      const response = await updateSkill({
        id: skillId,
        body: data,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Skill updated successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to updated skill. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update skill. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <button
        title="Update Skill"
        className="text-green-700 hover:bg-green-600 hover:text-white p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <DrawerDialog open={open} setOpen={setOpen} title="Update Skill">
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(SkillSchema)}
            defaultValues={{
              name: skillName,
              level: skillLevel,
              categoryId: skillCategory,
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
              disabled={categoriesFetching || isUpdating}
            >
              Save
            </Button>
          </Form>
        </div>
      </DrawerDialog>
    </div>
  );
};

export default UpdateSkill;
