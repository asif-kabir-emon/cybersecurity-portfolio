import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { Button } from "@/components/ui/button";
import { useReorderImagesMutation } from "@/redux/api/projectApi";
import { ArrowDownUp, Grip, ImagesIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "sonner";

const ITEM_TYPE = "IMAGE";

const DraggableImage = ({
  image,
  index,
  moveImage,
}: {
  image: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const [, ref] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      className="flex items-center gap-3 p-2 border-[1px] rounded-md my-2 cursor-move"
    >
      <Image
        src={image}
        width={170}
        height={100}
        alt={`Project Image ${index}`}
        className="w-[100px] h-[80px] md:w-[200px] md:h-[100px] object-cover rounded-md"
      />
      <div className="flex justify-between items-center w-full mx-5">
        <div className="">
          <span className="text-md md:text-xl hidden md:block">
            Image: {image.split("/").pop()}
          </span>
        </div>
        <Grip className="md:w-7 md:h-7 text-gray-400" />
      </div>
    </div>
  );
};

const ReorderProjectImage = ({
  projectId,
  projectTitle,
  projectImages,
}: {
  projectId: string;
  projectTitle: string;
  projectImages: string[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = useState(projectImages);
  const [updateProjectImages, { isLoading: isUpdating }] =
    useReorderImagesMutation();

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const onSubmit = async () => {
    console.log("Reordered Images:", images);

    const toastId = toast.loading("Please Wait! Try to update image order.", {
      position: "top-center",
    });

    try {
      const response = await updateProjectImages({
        id: projectId,
        body: {
          reorderedImagesArray: images,
        },
      }).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Image order update successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message ||
            "Failed to update image order for the project. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to update image order for the project. Please try again.",
        { id: toastId },
      );
    } finally {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setImages(projectImages);
    setOpen(false);
  };

  return (
    <div className="hidden md:block">
      <button
        aria-label="Reorder Project Image"
        className="hover:bg-slate-200 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setOpen(true)}
        disabled={projectImages.length === 0}
      >
        <ArrowDownUp className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={handleClose}
        title="Reorder Project Images"
        size="70%"
        heightAuto={true}
      >
        <div className="flex flex-col h-[90%]">
          {projectImages.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Image Available</span>
            </div>
          )}
          {images.length > 0 && (
            <div className="flex flex-col flex-grow overflow-y-auto ">
              <div className="">
                {images.map((image, index) => (
                  <DraggableImage
                    key={image}
                    image={image}
                    index={index}
                    moveImage={moveImage}
                  />
                ))}
              </div>
            </div>
          )}

          {images.length > 0 && (
            <div className="mt-auto">
              <Button
                type="submit"
                className="mt-5 w-full"
                onClick={onSubmit}
                disabled={isUpdating}
              >
                Update Image Order
              </Button>
            </div>
          )}
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default ReorderProjectImage;
