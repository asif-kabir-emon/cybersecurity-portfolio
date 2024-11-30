import InputImages from "@/components/Form/InputImages";
import Form from "@/components/Form/Form";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { ImageIcon, Trash2 } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  useAddProjectImagesMutation,
  useDeleteProjectImageMutation,
} from "@/redux/api/projectApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectImageSchema } from "@/schema/project.schema";
import { modifyPayload } from "@/utils/modifyPayload";

const ManageProjectImage = ({
  projectId,
  projectImages,
}: {
  projectId: string;
  projectImages: string[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [addProjectImages, { isLoading: isCreating }] =
    useAddProjectImagesMutation();
  const [deleteProjectImage, { isLoading: isDeleting }] =
    useDeleteProjectImageMutation();

  const deleteImage = async (imageId: string, projectId: string) => {
    const toastId = toast.loading(
      "Please Wait! Try to delete image from Project.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await deleteProjectImage({
        id: projectId,
        body: {
          url: imageId,
        },
      }).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Image deleted successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message ||
            "Failed to delete image from project. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to delete image from project. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  const addImages = async (data: FieldValues) => {
    const uploadedImages = data.images;
    delete data.images;

    const payload = {
      ...data,
      files: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading(
      "Please Wait! Try to add new images to project.",
      {
        position: "top-center",
      },
    );

    try {
      const response = await addProjectImages({
        id: projectId,
        body: modifiedData,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Image added successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to add image. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to add image. Please try again.", {
        id: toastId,
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        aria-label="Manage Project Image"
        className="hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <ImageIcon className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Manage Project Image"
        size="80%"
      >
        <div className="space-y-4 h-full">
          <div className="border-[1px] px-4 py-5 rounded-[5px] min-h-[45%]">
            <h2 className="text-lg text-gray-600 font-medium mb-2">
              All Images
            </h2>
            {projectImages.length === 0 && (
              <div className="mb-5">
                <span className="text-slate-400">No Image Available</span>
              </div>
            )}
            {projectImages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {projectImages.map((image: string) => (
                  <div
                    key={image}
                    className="relative w-[45%] h-[150px] md:w-[300px] md:h-[180px] border rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      width={400}
                      height={400}
                      alt={image}
                      className="object-cover w-full h-full rounded-[5px]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        deleteImage(image, projectId);
                      }}
                      className="absolute top-[5px] right-[5px] p-2 text-red-500 hover:bg-red-500 hover:text-white hover:bg-opacity-80 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-[1px] px-4 py-5 rounded-[5px]">
            <h2 className="text-lg text-gray-600 font-medium mb-2">
              Add Images
            </h2>
            <Form
              onSubmit={addImages}
              resolver={zodResolver(ProjectImageSchema)}
              defaultValues={{
                images: [],
              }}
            >
              <InputImages name="images" label="" />
              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={isCreating}
              >
                Save
              </Button>
            </Form>
          </div>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default ManageProjectImage;
