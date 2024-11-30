"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";
import { useDeleteProjectMutation } from "@/redux/api/projectApi";

const DeleteProject = ({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading("Please Wait! Try to delete Project.", {
      position: "top-center",
    });
    try {
      const response = await deleteProject(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Project deleted successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to delete project. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete project. Please try again.",
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
        title={`Delete Project`}
        onSubmit={() => onDelete(projectId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete "${projectTitle}" project?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteProject;
