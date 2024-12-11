import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
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
    contactInfo?: {
      email: string;
      phone: string;
      address: string;
      github: string;
      linkedin: string;
      whatsapp: string;
      telegram: string;
      twitter: string;
      youtube: string;
    };
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
        size="90%"
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ProfileSchema)}
            defaultValues={{
              name: profileData.name || "",
              title: profileData.title || "",
              bio: profileData.bio || "",
              contactInfo: {
                email: profileData.contactInfo?.email || "",
                phone: profileData.contactInfo?.phone || "",
                address: profileData.contactInfo?.address || "",
                github: profileData.contactInfo?.github || "",
                linkedin: profileData.contactInfo?.linkedin || "",
                whatsapp: profileData.contactInfo?.whatsapp || "",
                telegram: profileData.contactInfo?.telegram || "",
                twitter: profileData.contactInfo?.twitter || "",
                youtube: profileData.contactInfo?.youtube || "",
              },
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

              <InputBox
                name="contactInfo.email"
                label="Email"
                placeholder="Enter email address"
              />
              <InputBox
                name="contactInfo.phone"
                label="Phone"
                placeholder="Enter phone number"
              />
              <InputBox
                name="contactInfo.address"
                label="Address"
                placeholder="Enter address"
              />
              <InputBox
                name="contactInfo.github"
                label="GitHub"
                placeholder="Enter GitHub URL"
              />
              <InputBox
                name="contactInfo.linkedin"
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
              />
              <InputBox
                name="contactInfo.whatsapp"
                label="WhatsApp"
                placeholder="Enter WhatsApp number"
              />
              <InputBox
                name="contactInfo.telegram"
                label="Telegram"
                placeholder="Enter Telegram number or username"
              />
              <InputBox
                name="contactInfo.twitter"
                label="Twitter"
                placeholder="Enter Twitter URL"
              />
              <InputBox
                name="contactInfo.youtube"
                label="YouTube"
                placeholder="Enter YouTube URL"
              />
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
