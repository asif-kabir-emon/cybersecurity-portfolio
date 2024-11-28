import {
  BookOpen,
  Briefcase,
  Contact,
  FileBadge,
  NotebookPen,
  Presentation,
  ReceiptText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Contacts Info",
    url: "contacts",
    icon: Contact,
  },
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
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
