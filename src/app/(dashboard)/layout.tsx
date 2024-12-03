"use client";
import { AppSidebar } from "@/components/Dashboard/app-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
