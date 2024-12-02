"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";
import { useDeleteExperienceMutation } from "@/redux/api/experienceApi";

const DeleteExperience = ({
  experienceId,
  companyName,
  role,
}: {
  experienceId: string;
  companyName: string;
  role: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading(
      "Please Wait! Try to delete experience record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await deleteExperience(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(
          response?.message || "Experience record deleted successfully.",
          {
            id: toastId,
          },
        );
      } else {
        throw new Error(
          response?.message ||
            "Failed to delete experience record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to delete experience record. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        aria-label="Delete Project"
        className="text-red-500 hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <DrawerDelete
        open={open}
        setOpen={setOpen}
        title={`Delete Experience Record`}
        onSubmit={() => onDelete(experienceId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete experience record from "${role}" at "${companyName}"?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteExperience;
