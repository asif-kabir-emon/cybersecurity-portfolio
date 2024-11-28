import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { SkillCategorySchema } from "@/schema/skill-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { useAddCategoryMutation } from "@/redux/api/skillApi";
import { toast } from "sonner";

const CreateCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [addCategory, { isLoading: isCreating }] = useAddCategoryMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to add new Category.", {
      position: "top-center",
    });
    console.log(data);
    try {
      const response = await addCategory(data).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Category added successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to add category. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to add category. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Category
      </Button>
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        title="Create Category"
        description="Skill's categories refers to which category belongs to skills. For example, if you have a skill called 'React', you can categorize it under 'Front-End' category."
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(SkillCategorySchema)}
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
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Save
            </Button>
          </Form>
        </div>
      </DrawerDialog>
    </div>
  );
};

export default CreateCategory;
