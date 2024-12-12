"use client";
import AppHeader from "@/components/Dashboard/app-header";
import Loader from "@/components/Shared/Skeleton/Loader";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
} from "@/redux/api/profileApi";
import React from "react";
import { toast } from "sonner";
import FileUploader from "@/components/Shared/FileUploader/FileUploader";
import Image from "next/image";
import UpdateProfileInfo from "./UpdateInfo";
import LinkedIn from "@/assets/icons/linkedin.png";
import Github from "@/assets/icons/github.png";
import WhatsApp from "@/assets/icons/whatsapp.png";
import Telegram from "@/assets/icons/telegram.png";
import Twitter from "@/assets/icons/twitter.png";
import YouTube from "@/assets/icons/youtube.png";
import Email from "@/assets/icons/email.png";
import Phone from "@/assets/icons/call.png";
import Address from "@/assets/icons/address.png";

const ProfilePage = () => {
  const { data: profile, isLoading: isFetchingData } = useGetProfileQuery({});
  const [updateProfileImage] = useUpdateProfileImageMutation();

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
      const response = await updateProfileImage(formData).unwrap();

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
        showLastPath={false}
        baseRouteName="Profile"
        baseRoutePath="/profiles"
      />
      {profile && profile?.data && (
        <div className="m-5 space-y-3">
          <div className="text-center">
            {profile?.data?.image && profile?.data?.image !== "" ? (
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
                <h2 className="text-2xl font-semibold">
                  {profile?.data?.name}
                </h2>
                <h3 className="text-xl">{profile?.data?.title}</h3>
              </div>
              <UpdateProfileInfo
                profileData={{
                  name: profile.data.name,
                  title: profile.data.title,
                  bio: profile.data.bio,
                  resume: profile.data.resume,
                  contactInfo: profile.data?.contactInfo || {},
                }}
              />
            </div>
            <p className="pt-2">{profile.data.bio}</p>
            {profile.data.resume && profile.data.resume !== "" && (
              <a
                href={profile?.data?.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:cursor-pointer"
              >
                <div className="mt-2">Resume</div>
              </a>
            )}
          </div>
          <div className="mt-7 space-y-1 p-6 border-[1px] border-gray-300 rounded-[5px]">
            <div className="w-full flex justify-between mb-1">
              <h3 className="text-xl font-semibold">Contact Info</h3>
              <button className="text-black hover:bg-slate-200 p-1 rounded-full cursor-pointer">
                <UpdateProfileInfo profileData={profile.data} />
              </button>
            </div>
            <div className="space-y-4">
              {profile.data.contactInfo?.email &&
                profile.data.contactInfo?.email !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Email}
                      width={20}
                      height={20}
                      alt="email"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Email</h4>
                      <div>{profile.data.contactInfo.email}</div>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.phone &&
                profile.data.contactInfo?.phone !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Phone}
                      width={20}
                      height={20}
                      alt="phone"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Phone</h4>
                      <div>{profile.data.contactInfo.phone}</div>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.address &&
                profile.data.contactInfo?.address !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Address}
                      width={20}
                      height={20}
                      alt="address"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Address</h4>
                      <div>{profile.data.contactInfo.address}</div>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.linkedin &&
                profile.data.contactInfo?.linkedin !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={LinkedIn}
                      width={20}
                      height={20}
                      alt="linkedin"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">LinkedIn</h4>
                      <a
                        href={profile.data.contactInfo.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.linkedin
                          .split("https://www.")[1]
                          .split("/")
                          .join("/")}
                      </a>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.github &&
                profile.data.contactInfo?.github !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Github}
                      width={20}
                      height={20}
                      alt="github"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Github</h4>
                      <a
                        href={profile.data.contactInfo.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.github
                          .split("https://")[1]
                          .split("/")
                          .join("/")}
                      </a>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.whatsapp &&
                profile.data.contactInfo?.whatsapp !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={WhatsApp}
                      width={20}
                      height={20}
                      alt="whatsapp"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Whatsapp</h4>
                      <a
                        href={`https://wa.me/${profile.data.contactInfo?.whatsapp}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.telegram &&
                profile.data.contactInfo?.telegram !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Telegram}
                      width={20}
                      height={20}
                      alt="telegram"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Telegram</h4>
                      <a
                        href={`https://t.me/${profile.data.contactInfo?.telegram}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.telegram}
                      </a>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.twitter &&
                profile.data.contactInfo?.twitter !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={Twitter}
                      width={20}
                      height={20}
                      alt="twitter"
                      className="w-5 h-5 mt-[3px]"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">Twitter</h4>
                      <a
                        href={`https://t.me/${profile.data.contactInfo?.twitter}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.twitter
                          .split("https://x.com/")[1]
                          .split("/")
                          .join("/")}
                      </a>
                    </div>
                  </div>
                )}
              {profile.data.contactInfo?.youtube &&
                profile.data.contactInfo?.youtube !== "" && (
                  <div className="flex gap-4">
                    <Image
                      src={YouTube}
                      width={20}
                      height={20}
                      alt="youtube"
                      className="w-6 h-6"
                    />
                    <div>
                      <h4 className="text-[18px] mb-[2px]">YouTube</h4>
                      <a
                        href={`https://t.me/${profile.data.contactInfo?.youtube}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className=" hover:underline hover:cursor-pointer"
                      >
                        {profile.data.contactInfo.youtube
                          .split("https://www.youtube.com/")[1]
                          .split("/")
                          .join("/")}
                      </a>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
