"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddExperience from "./AddExperience";
import { useGetExperiencesQuery } from "@/redux/api/experienceApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";
import { Months } from "@/constants";
import DeleteExperience from "./DeleteExperience";
import UpdateExperience from "./UpdateExperience";

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

          {!isFetchingData && experiences?.data?.length > 0 && (
            <div className="mt-5 space-y-3">
              {experiences?.data?.map(
                (experience: {
                  id: string;
                  companyName: string;
                  role: string;
                  startDate: {
                    month: number;
                    year: number;
                  };
                  endDate: {
                    month: number;
                    year: number;
                  };
                  description: string;
                }) => (
                  <div
                    key={experience.id}
                    className="rounded-[10px] border-[1px] border-slate-300 p-5"
                  >
                    <div className="flex justify-between">
                      <div className="space-y-[1px]">
                        <h1 className="text-xl">{experience.role}</h1>
                        <p className="text-md text-slate-600">
                          {experience.companyName}
                        </p>
                        <p className="text-sm text-slate-500">
                          <span>
                            {Months[experience.startDate.month].label},{" "}
                            {experience.startDate.year}
                          </span>
                          <span> - </span>
                          {experience.endDate.month !== 0 ? (
                            <span>
                              {Months[experience.endDate.month].label},{" "}
                              {experience.endDate.year}
                            </span>
                          ) : (
                            <span>Present</span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <UpdateExperience
                          experienceId={experience.id}
                          experience={experience}
                        />
                        <DeleteExperience
                          experienceId={experience.id}
                          companyName={experience.companyName}
                          role={experience.role}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
