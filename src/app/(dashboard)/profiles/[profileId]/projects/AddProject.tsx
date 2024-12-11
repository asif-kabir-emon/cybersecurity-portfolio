import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import { ProfileSchema } from "@/schema/profile.schema";
import SelectBox from "@/components/Form/SelectBox";

const AddProfileProject = ({
  profileId,
  projectsData,
  isLoading,
}: {
  profileId: string;
  projectsData: {
    label: string;
    value: string;
  }[];
  isLoading: boolean;
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
        className="text-black hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:text-slate-400"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        <Plus size={22} />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Profile Info"
        description=""
        size="90%"
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ProfileSchema)}
            defaultValues={{
              ids: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <SelectBox name="ids" label="S" items={projectsData} />
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

export default AddProfileProject;
