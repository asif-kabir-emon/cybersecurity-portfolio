"use client";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <main className="w-full h-auto overflow-y-auto">
        <div className="min-h-screen">{children}</div>
      </main>
    </SidebarProvider>
  );
}
