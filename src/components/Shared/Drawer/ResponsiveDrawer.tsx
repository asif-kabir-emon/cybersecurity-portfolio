import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type ResponsiveDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "full" | string;
};

export function ResponsiveDrawer({
  open,
  setOpen,
  title,
  description = "",
  children,
  size = "80%",
}: ResponsiveDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          style={{
            width: size === "full" ? "100%" : size,
            height: size === "full" ? "100%" : size,
            maxWidth: size === "full" ? "100vw" : undefined,
            maxHeight: size === "full" ? "100vh" : undefined,
            overflowY: "auto",
          }}
          className={`w-full ${
            size === "full" ? "" : "sm:max-w-[calc(100%-2rem)]"
          }`}
        >
          <div>
            <DialogTitle className="mb-5">{title}</DialogTitle>
            {description.length > 0 && (
              <DialogDescription className="text-gray-700 mb-7">
                {description}
              </DialogDescription>
            )}
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-full overflow-y-auto">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <div>
            {description.length > 0 && (
              <DialogDescription className="text-gray-700 mb-7">
                {description}
              </DialogDescription>
            )}
            {children}
          </div>
          <DrawerClose asChild>
            <Button variant="outline" className="mt-2">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
