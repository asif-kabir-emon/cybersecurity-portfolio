"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";
import { useDeleteCategoryMutation } from "@/redux/api/skillApi";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";

const DeleteCategory = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading("Please Wait! Try to delete Category.", {
      position: "top-center",
    });
    try {
      const response = await deleteCategory(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Category deleted successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to delete category. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete category. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0 bg-white text-red-500 hover:bg-red-500 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Trash /> Delete
      </Button>
      <DrawerDelete
        open={open}
        setOpen={setOpen}
        title={`Delete "${categoryName}" category`}
        onSubmit={() => onDelete(categoryId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete "${categoryName}" category?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteCategory;
