import {
  BookOpen,
  Briefcase,
  Contact,
  FileBadge,
  LayoutDashboard,
  NotebookPen,
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
import { ProfileSwitcher } from "./profile-switcher";
import ProfileSideMenu from "./profile-side-menu";

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
    title: "Profile",
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
  return (
    <Sidebar>
      <SidebarHeader>
        <ProfileSwitcher
          versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta1"]}
          defaultVersion={["1.0.1", "1.1.0-alpha", "2.0.0-beta1"][0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            {group.title !== "Profile" && (
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )}

            {group.title === "Profile" && (
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
                    <ProfileSideMenu />
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <p className="text-center text-xs text-gray-500">
          &copy; 2021 All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
