import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import TextEditor from "@/components/Form/TextEditor";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { BlogSchema } from "@/schema/blog.schema";
import InputImage from "@/components/Form/InputImage";
import { useUpdateBlogMutation } from "@/redux/api/blogApi";
import Image from "next/image";
import { modifyPayload } from "@/utils/modifyPayload";

const UpdateBlog = ({
  blogId,
  blogData,
}: {
  blogId: string;
  blogData: {
    title: string;
    content: string;
    image: string;
    tags: string[];
  };
}) => {
  const [open, setOpen] = React.useState(false);

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const onSubmit = async (data: FieldValues) => {
    const uploadedImages = data.image ? [data.image] : [];
    delete data.image;

    const payload = {
      ...data,
      files: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading("Please Wait! Try to update blog.", {
      position: "top-center",
    });

    try {
      const response = await updateBlog({
        id: blogId,
        body: modifiedData,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Blog updated successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to updated blog. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update blog. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <button
        aria-label="Update Blog"
        className="hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Project"
        size="90%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(BlogSchema)}
            defaultValues={{
              title: blogData.title,
              content: blogData.content,
              tags: blogData.tags || [],
              image: null,
            }}
          >
            <div className="flex flex-col gap-4">
              {blogData.image && (
                <>
                  <h3 className="text-md mb-1">Blog Image</h3>
                  <Image
                    src={blogData.image}
                    width={150}
                    height={85}
                    alt={blogData.title}
                    className="rounded-[5px] w-full md:w-[400px] border-2 border-slate-200"
                  />
                </>
              )}
              <InputImage
                name="image"
                label={blogData.image ? "Update Blog Image" : "Add Blog Image"}
              />
              <InputBox
                name="title"
                label="Blog Title"
                placeholder="Enter blog title"
                required={true}
              />
              <TextEditor
                name="content"
                label="Blog Content"
                placeholder="Enter blog content"
                required={true}
              />
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isUpdating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default UpdateBlog;
