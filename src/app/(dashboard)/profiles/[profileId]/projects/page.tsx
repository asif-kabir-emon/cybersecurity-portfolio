"use client";
import AppHeader from "@/components/Dashboard/app-header";
import { useGetProfileProjectsQuery } from "@/redux/api/profileApi";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import AddProfileProject from "./AddProject";
import { useGetProjectsQuery } from "@/redux/api/projectApi";

type ProfileProps = {
  params: {
    profileId: string;
  };
};

const ProfileProjectPage = ({ params }: ProfileProps) => {
  const { profileId } = params;
  const { data: profileProjects, isLoading: isFetchingProfileProjectsData } =
    useGetProfileProjectsQuery(profileId);
  const { data: projects, isLoading: isFetchingProjectsData } =
    useGetProjectsQuery({});

  console.log(projects);

  return (
    <div>
      <AppHeader
        pageName="Projects"
        baseRouteName={`${profileId}`}
        baseRoutePath={`/profiles/${profileId}`}
      />
      <div className="m-5">
        <div className="mt-7 space-y-1 p-6 border-[1px] border-gray-300 rounded-[5px] bg-slate-50">
          <div className="flex justify-between items-center gap-2 p-2">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <div className="flex gap-7">
              <ChevronsUpDown size={20} className="p-2" />
              <AddProfileProject
                profileId={profileId}
                projectsData={[
                  ...(Array.isArray(projects?.data)
                    ? projects.data.map(
                        (skill: { id: string; title: string }) => ({
                          value: skill.id,
                          label: skill.title,
                        }),
                      )
                    : []),
                ]}
                isLoading={
                  isFetchingProjectsData || projects?.data?.length === 0
                }
              />
            </div>
          </div>
        </div>

        {profileProjects &&
          profileProjects?.data?.projects.ids.length === 0 && (
            <div className="mt-7 space-y-1 p-6 border-[1px] border-gray-300 rounded-[5px] py-20 bg-slate-50">
              <h2 className="text-center text-md text-slate-700">
                No Projects found for this Profile
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfileProjectPage;
