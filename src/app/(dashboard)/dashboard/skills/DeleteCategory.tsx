"use client";
import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
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
    <>
      <button
        aria-label="Delete Project"
        className="hover:text-red-300 "
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <DrawerDelete
        open={open}
        setOpen={setOpen}
        title={`Delete "${categoryName}" category`}
        onSubmit={() => onDelete(categoryId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete "${categoryName}" category?`}
      ></DrawerDelete>
    </>
  );
};

export default DeleteCategory;
