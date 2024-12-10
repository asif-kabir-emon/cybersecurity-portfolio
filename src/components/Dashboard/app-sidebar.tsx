import {
  BookOpen,
  Briefcase,
  Contact,
  FileBadge,
  LayoutDashboard,
  LogOutIcon,
  NotebookPen,
  NotebookText,
  Presentation,
  ReceiptText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { authKey } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeProfiles } from "@/redux/feature/profile/profileSlicer";
import type { RootState } from "@/redux/store";

const data = [
  {
    title: "Dashboard",
    url: "",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Profile",
        url: "profiles/add-profile",
        icon: Contact,
      },
    ],
  },
  {
    title: "Profiles",
    url: "profiles",
    items: [],
  },
  {
    title: "Category",
    url: "dashboard",
    items: [
      {
        title: "Skills",
        url: "skills",
        icon: ReceiptText,
      },
      {
        title: "Projects",
        url: "projects",
        icon: Presentation,
      },
      {
        title: "Blogs",
        url: "blogs",
        icon: NotebookPen,
      },
      {
        title: "Educations",
        url: "educations",
        icon: BookOpen,
      },
      {
        title: "Experiences",
        url: "experiences",
        icon: Briefcase,
      },
      {
        title: "Certifications",
        url: "certifications",
        icon: FileBadge,
      },
    ],
  },
];

export function AppSidebar() {
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const dispatch = useDispatch();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl ml-2">
          <span className="font-bold">Portfolio</span> Builder
        </h1>
      </SidebarHeader>
      <SidebarContent>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={`${group.url ? `/${group.url}` : ""}/${
                            item.url
                          }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {group.title === "Profiles" && (
                    <>
                      {profiles?.map(({ profileId, title }) => (
                        <SidebarMenuItem key={profileId}>
                          <SidebarMenuButton asChild>
                            <a href={`/profiles/${profileId}`}>
                              <NotebookText />
                              <span>{title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button
          className="w-full mt-5"
          onClick={() => {
            Cookies.remove(authKey);
            window.location.href = "/login";
            dispatch(removeProfiles());
          }}
        >
          <LogOutIcon />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
