"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { useDeleteSkillMutation } from "@/redux/api/skillApi";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";

const DeleteSkill = ({
  skillId,
  skillName,
}: {
  skillId: string;
  skillName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteSkill, { isLoading: isDeleting }] = useDeleteSkillMutation();

  const onDelete = async (id: string) => {
    console.log(id);
    const toastId = toast.loading("Please Wait! Try to delete skill.", {
      position: "top-center",
    });
    try {
      const response = await deleteSkill(id).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Skill deleted successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to delete skill. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete skill. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        title="Delete Skill"
        className="text-red-500 hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <DrawerDelete
        open={open}
        setOpen={setOpen}
        title={`Delete Skill`}
        onSubmit={() => onDelete(skillId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete "${skillName}" skill?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteSkill;
