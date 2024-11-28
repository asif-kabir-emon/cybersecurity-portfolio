import * as React from "react";

import { cn } from "@/lib/utils";
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

type DrawerDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDisabled?: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
};

export function DrawerDelete({
  open,
  setOpen,
  title,
  description = "",
  children,
  onSubmit,
  isDisabled = false,
}: DrawerDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-black">
            {description}
          </DialogDescription>
          {children}
          <Button
            className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={onSubmit}
            disabled={isDisabled}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <div>
            <DialogDescription className="text-md text-black">
              {description}
            </DialogDescription>
            {children}
            <Button
              className="mt-7 w-full bg-red-500 hover:bg-red-600 text-white"
              onClick={onSubmit}
              disabled={isDisabled}
            >
              Delete
            </Button>
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
