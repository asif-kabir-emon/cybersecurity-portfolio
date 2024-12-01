import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingTableData = () => {
  return (
    <div className="w-full space-y-3 mt-5">
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
      <Skeleton className="h-6 w-full rounded-full bg-slate-300" />
      <div className="flex gap-1">
        <Skeleton className="h-6 w-[80%] rounded-full bg-slate-300" />
        <Skeleton className="h-6 w-[20%] rounded-full bg-slate-300" />
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-6 w-[40%] rounded-full bg-slate-300" />
        <Skeleton className="h-6 w-[30%] rounded-full bg-slate-300" />
        <Skeleton className="h-6 w-[30%] rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

export default LoadingTableData;
