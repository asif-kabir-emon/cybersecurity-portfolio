"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { DrawerDelete } from "@/components/Shared/Drawer/DeleteDrawer";
import { useDeleteBlogMutation } from "@/redux/api/blogApi";

const DeleteBlog = ({
  blogId,
  blogTitle,
}: {
  blogId: string;
  blogTitle: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const onDelete = async (id: string) => {
    const toastId = toast.loading("Please Wait! Try to delete Blog.", {
      position: "top-center",
    });
    try {
      const response = await deleteBlog(id).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Blog deleted successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to delete blog. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete blog. Please try again.",
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
        title={`Delete Blog`}
        onSubmit={() => onDelete(blogId)}
        isDisabled={isDeleting}
        description={`Are you sure you want to delete "${blogTitle}" Blog?`}
      ></DrawerDelete>
    </div>
  );
};

export default DeleteBlog;
