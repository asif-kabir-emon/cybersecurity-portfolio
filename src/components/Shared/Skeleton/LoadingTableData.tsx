import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingTableData = () => {
  return (
    <div className="w-full space-y-3 mt-5">
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
    </div>
  );
};

export default LoadingTableData;
