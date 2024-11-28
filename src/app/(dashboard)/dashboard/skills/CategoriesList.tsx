import { useGetCategoriesQuery } from "@/redux/api/skillApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import React from "react";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesList = () => {
  const { data: categories, isLoading: isFetchingData } = useGetCategoriesQuery(
    {},
  );

  return (
    <div className="mt-7">
      <h1 className="text-lg text-gray-600">Categories</h1>

      <div className="mt-3 flex flex-wrap gap-2">
        {isFetchingData && (
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-28 rounded-full bg-slate-300" />
            <Skeleton className="h-7 w-28 rounded-full bg-slate-300" />
            <Skeleton className="h-7 w-28 rounded-full bg-slate-300" />
          </div>
        )}

        {!isFetchingData && categories?.data?.length === 0 && (
          <div className="mb-5">
            <span className="text-slate-400">No Category Available</span>
          </div>
        )}

        {categories?.data?.map((category: { name: string; id: string }) => (
          <div
            key={category.id}
            className="flex flex-row justify-center items-center gap-2 bg-gray-700 text-white text-sm rounded-full px-5 py-1"
          >
            <span>{category.name}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="border-0 p-0 border-white focus:border-0">
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-30">
                <DeleteCategory
                  categoryId={category.id}
                  categoryName={category.name}
                />
                <UpdateCategory
                  categoryId={category.id}
                  categoryName={category.name}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
