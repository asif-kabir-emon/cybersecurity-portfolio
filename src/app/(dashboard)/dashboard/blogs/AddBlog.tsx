import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import TextEditor from "@/components/Form/TextEditor";
import { modifyPayload } from "@/utils/modifyPayload";
import InputImage from "@/components/Form/InputImage";
import { BlogSchema } from "@/schema/blog.schema";
import { useAddBlogMutation } from "@/redux/api/blogApi";

const AddBlog = () => {
  const [open, setOpen] = React.useState(false);
  const [addBlog, { isLoading: isCreating }] = useAddBlogMutation();

  const onSubmit = async (data: FieldValues) => {
    const uploadedImages = data.image ? [data.image] : [];
    delete data.image;

    const payload = {
      ...data,
      files: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading("Please Wait! Try to add new Blog.", {
      position: "top-center",
    });
    try {
      const response = await addBlog(modifiedData).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Blog added successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to add blog. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to add blog. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Blog
      </Button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Add Blog"
        description="Blog is a place where you can share your knowledge, experience, and thoughts with the world. You can add a new blog by filling the form below. "
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(BlogSchema)}
            defaultValues={{
              title: "",
              content: "",
              tags: [],
              image: null,
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="title"
                label="Blog Title"
                placeholder="Enter blog title"
                required={true}
              />
              <InputImage name="image" label="Blog Image" />
              <TextEditor
                name="content"
                label="Blog Content"
                placeholder="Enter blog content"
                required={true}
              />
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default AddBlog;
