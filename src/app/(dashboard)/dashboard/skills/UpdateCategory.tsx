import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import { Button } from "@/components/ui/button";
import { SkillCategorySchema } from "@/schema/skill-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { useUpdateCategoryMutation } from "@/redux/api/skillApi";
import { toast } from "sonner";

const UpdateCategory = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to update Category.", {
      position: "top-center",
    });
    console.log(data);
    try {
      const response = await updateCategory({
        id: categoryId,
        body: data,
      }).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Category updated successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to updated category. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update category. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <>
      <button
        aria-label="Delete Project"
        className="hover:text-green-300"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-4 h-4" />
      </button>
      <DrawerDialog open={open} setOpen={setOpen} title="Update Category">
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(SkillCategorySchema)}
            defaultValues={{
              name: categoryName,
            }}
          >
            <InputBox
              name="name"
              label="Category Name"
              placeholder="Enter skill category name"
              required={true}
            />
            <Button type="submit" className="mt-5 w-full" disabled={isUpdating}>
              Save
            </Button>
          </Form>
        </div>
      </DrawerDialog>
    </>
  );
};

export default UpdateCategory;
