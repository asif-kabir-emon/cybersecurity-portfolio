"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";
import { useDeleteCertificationRecordMutation } from "@/redux/api/certificationApi";

const DeleteCertification = ({
  certificationId,
  certificationName,
}: {
  certificationId: string;
  certificationName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteCertification, { isLoading: isDeleting }] =
    useDeleteCertificationRecordMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading("Please Wait! Try to delete certification.", {
      position: "top-center",
    });
    try {
      const response = await deleteCertification(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(
          response?.message || "Certification data deleted successfully.",
          {
            id: toastId,
          },
        );
      } else {
        throw new Error(
          response?.message ||
            "Failed to delete certification. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete certification. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        aria-label="Delete Certification"
        className="text-red-500 hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <DrawerDelete
        open={open}
        setOpen={setOpen}
        title={`Delete Certification`}
        onSubmit={() => onDelete(certificationId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete ${certificationName} certification?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteCertification;
