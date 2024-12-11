import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import TextEditor from "@/components/Form/TextEditor";
import { modifyPayload } from "@/utils/modifyPayload";
import InputImage from "@/components/Form/InputImage";
import { BlogSchema } from "@/schema/blog.schema";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import TextAreaBox from "@/components/Form/TextAreaBox";
import { ProfileSchema } from "@/schema/profile.schema";

const UpdateProfileInfo = ({
  profileId,
  profileData,
}: {
  profileId: string;
  profileData: {
    name: string;
    title: string;
    bio: string;
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const [updatingProfileInfo, { isLoading: isCreating }] =
    useUpdateProfileMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to update profile info.", {
      position: "top-center",
    });
    try {
      const response = await updatingProfileInfo({
        id: profileId,
        body: data,
      }).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(
          response?.message || "Profile info updated successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to update profile info. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update profile info. Please try again.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <div>
      <button
        className="text-black hover:bg-slate-200 p-2 rounded-full cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <SquarePen size={22} />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Profile Info"
        description=""
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ProfileSchema)}
            defaultValues={{
              name: profileData.name || "",
              title: profileData.title || "",
              bio: profileData.bio || "",
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="name"
                label="Name"
                placeholder="Enter name"
                required={true}
              />
              <InputBox
                name="title"
                label="Job Title"
                placeholder="Enter job title"
                required={true}
              />
              <TextAreaBox name="bio" label="Bio" />
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Update
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default UpdateProfileInfo;
