import { useGetProfilesQuery } from "@/redux/api/profileApi";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Contact } from "lucide-react";

const ProfileSideMenu = () => {
  const { data: profiles, isLoading: isFetchingData } = useGetProfilesQuery({});
  return (
    <>
      {profiles?.data?.map((profile: { profileId: string; name: string }) => (
        <SidebarMenuItem key={profile.profileId}>
          <SidebarMenuButton asChild>
            <a href={`/profiles/${profile.profileId}`}>
              <Contact />
              <span>{profile.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default ProfileSideMenu;
