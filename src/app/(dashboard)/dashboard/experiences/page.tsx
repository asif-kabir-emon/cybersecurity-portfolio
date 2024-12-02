"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddExperience from "./AddExperience";
import { useGetExperiencesQuery } from "@/redux/api/experienceApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";

const Experiences = () => {
  const { data: experiences, isLoading: isFetchingData } =
    useGetExperiencesQuery({});

  return (
    <div>
      <AppHeader pageName="Experiences" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Experiences</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddExperience />
          </div>
        </div>

        <div>
          {isFetchingData && (
            <div>
              <LoadingTableData />
            </div>
          )}

          {!isFetchingData && experiences?.data?.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Experience Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
