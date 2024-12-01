"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";
import { useDeleteEducationRecordMutation } from "@/redux/api/educationApi";

const DeleteEducation = ({
  educationalRecordId,
  schoolName,
  degreeName,
}: {
  educationalRecordId: string;
  schoolName: string;
  degreeName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteProject, { isLoading: isDeleting }] =
    useDeleteEducationRecordMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading(
      "Please Wait! Try to delete educational record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await deleteProject(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(
          response?.message || "Educational record deleted successfully.",
          {
            id: toastId,
          },
        );
      } else {
        throw new Error(
          response?.message ||
            "Failed to delete educational record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to delete educational record. Please try again.",
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
        title={`Delete Educational Record`}
        onSubmit={() => onDelete(educationalRecordId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete educational record from "${schoolName}" with degree "${degreeName}"?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteEducation;
