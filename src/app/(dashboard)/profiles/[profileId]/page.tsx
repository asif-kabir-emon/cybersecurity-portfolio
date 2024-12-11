"use client";
import AppHeader from "@/components/Dashboard/app-header";
import Loader from "@/components/Shared/Skeleton/Loader";
import {
  useDeleteProfileImageMutation,
  useGetProfileQuery,
  useUpdateProfileImageMutation,
} from "@/redux/api/profileApi";
import React from "react";
import { toast } from "sonner";
import FileUploader from "@/components/Shared/FileUploader/FileUploader";
import Image from "next/image";
import { Pen, SquarePen } from "lucide-react";
import UpdateProfileInfo from "./UpdateProfileInfo";

type ProfileProps = {
  params: {
    profileId: string;
  };
};

const ProfilePage = ({ params }: ProfileProps) => {
  const { profileId } = params;
  const { data: profile, isLoading: isFetchingData } =
    useGetProfileQuery(profileId);
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [deleteProfileImage] = useDeleteProfileImageMutation();

  console.log(profile);

  if (isFetchingData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const updateImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const toastId = toast.loading("Please Wait! Try to update profile Image.", {
      position: "top-center",
    });

    try {
      const response = await updateProfileImage({
        id: profileId,
        body: formData,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Profile Image Updated Successfully!",
          { id: toastId },
        );
      } else {
        throw new Error(
          response?.message ||
            "Failed to update profile image. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update profile image. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <AppHeader
        pageName={`${profileId}`}
        baseRouteName="Profile"
        baseRoutePath="/profiles"
      />
      <div className="m-5">
        <div className="text-center">
          {profile && profile?.data?.image && profile?.data?.image !== "" ? (
            <Image
              src={profile?.data?.image}
              width={250}
              height={250}
              className="rounded-full mx-auto border-[5px] border-gray-50 shadow-sm"
              alt="Profile Image"
            />
          ) : (
            <div className="bg-gray-300 w-48 h-48 mx-auto rounded-full" />
          )}
          <div className="mt-5">
            <FileUploader
              onSubmit={updateImage}
              buttonText="Update Image"
              fileType="image/*"
            />
          </div>
        </div>
        <div className="mt-7 space-y-1 p-6 border-[1px] border-gray-300 rounded-[5px]">
          <div className="flex justify-between gap-2">
            <div>
              <h2 className="text-2xl font-semibold">{profile.data.name}</h2>
              <h3 className="text-xl">{profile.data.title}</h3>
            </div>
            <UpdateProfileInfo
              profileId={profileId}
              profileData={{
                name: profile.data.name,
                title: profile.data.title,
                bio: profile.data.bio,
              }}
            />
          </div>
          <p>{profile.data.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
