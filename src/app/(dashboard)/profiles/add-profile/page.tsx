"use client";
import AppHeader from "@/components/Dashboard/app-header";
import Form from "@/components/Form/Form";
import InputBox from "@/components/Form/InputBox";
import TextAreaBox from "@/components/Form/TextAreaBox";
import { Button } from "@/components/ui/button";
import {
  useAddProfileMutation,
  useGetProfilesQuery,
} from "@/redux/api/profileApi";
import {
  addNewProfile,
  addProfiles,
} from "@/redux/feature/profile/profileSlicer";
import { ProfileSchema } from "@/schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const CreateProfilePage = () => {
  const router = useRouter();
  const [addProfile, { isLoading: isCreating }] = useAddProfileMutation();
  const { data: profiles, isLoading: isFetchingData } = useGetProfilesQuery({});
  const dispatch = useDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to create new profile.", {
      position: "top-center",
    });
    try {
      const response = await addProfile(data).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Profile created successfully.", {
          id: toastId,
        });

        // wait until isFetchingData is false
        while (isFetchingData) {
          continue;
        }

        dispatch(
          addProfiles([
            ...profiles?.data?.map(
              (profile: { profileId: string; title: string }) => ({
                profileId: profile.profileId,
                title: profile.title,
              }),
            ),
          ]),
        );

        dispatch(
          addNewProfile({
            profileId: response?.data?.profileId,
            title: response?.data?.title,
          }),
        );

        router.push(`/profiles/${response?.data?.profileId}`);
      } else {
        throw new Error(
          response?.message || "Failed to create profile. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to create profile. Please try again.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <div>
      <AppHeader
        pageName="Create Profile"
        baseRouteName="Profile"
        baseRoutePath="/profiles"
      />
      <div className="m-5 border-[1px] border-slate-400 rounded-[5px] p-5">
        <Form
          onSubmit={onSubmit}
          resolver={zodResolver(ProfileSchema)}
          defaultValues={{
            name: "",
            title: "",
            bio: "",
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
            Create Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
