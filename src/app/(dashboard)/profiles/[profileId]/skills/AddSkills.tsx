import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import { ProfileSchema } from "@/schema/profile.schema";
import { DrawerDialog } from "@/components/Shared/Drawer/DialogDrawer";
import MultiSelector from "@/components/Form/MultiSelectBox";
import { useGetSkillsQuery } from "@/redux/api/skillApi";

const AddSkills = ({
  profileId,
  profileData,
}: {
  profileId: string;
  profileData: {
    skills: string[];
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const [updatingProfileInfo, { isLoading: isCreating }] =
    useUpdateProfileMutation();

  const { data: skills, isLoading: isFetchingData } = useGetSkillsQuery({});

  

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
        <Plus size={22} />
      </button>
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        title="Add Skills to Profile"
        description=""
      >
        <div>
          {!isFetchingData && skills.data.length > 0 && (
            <Form
              onSubmit={onSubmit}
              resolver={zodResolver(ProfileSchema)}
              defaultValues={{
                skills: [
                  ...skills.data.map((skill: { id: string; name: string }) => ({
                    value: skill.id,
                    label: skill.name,
                  })),
                ],
              }}
            >
              <div className="flex flex-col gap-4">
                <MultiSelector
                  name="skills"
                  label="Selected Skills"
                  options={[
                    ...skills.data.map(
                      (skill: { id: string; name: string }) => ({
                        value: skill.id,
                        label: skill.name,
                      }),
                    ),
                  ]}
                  required
                />
              </div>
              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={isCreating}
              >
                Add Skills
              </Button>
            </Form>
          )}
        </div>
      </DrawerDialog>
    </div>
  );
};

export default AddSkills;
