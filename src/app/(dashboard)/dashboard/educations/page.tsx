"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddEducation from "./AddEducation";
import { useGetEducationRecordsQuery } from "@/redux/api/educationApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";
import { Months } from "@/constants";
import DeleteEducation from "./DeleteEducation";
import UpdateEducation from "./UpdateEducation";

const Educations = () => {
  const { data: educational_records, isLoading: isFetchingData } =
    useGetEducationRecordsQuery({});

  return (
    <div>
      <AppHeader pageName="Educations" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Education</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddEducation />
          </div>
        </div>

        <div>
          {isFetchingData && (
            <div>
              <LoadingTableData />
            </div>
          )}

          {!isFetchingData && educational_records?.data?.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Education Available</span>
            </div>
          )}

          {!isFetchingData && educational_records?.data?.length > 0 && (
            <div className="mt-5 space-y-3">
              {educational_records?.data?.map(
                (education_record: {
                  id: string;
                  school: string;
                  degree: string;
                  fieldOfStudy: string;
                  startDate: {
                    month: number;
                    year: number;
                  };
                  endDate: {
                    month: number;
                    year: number;
                  };
                  grade: string;
                }) => (
                  <div
                    key={education_record.id}
                    className="rounded-[10px] border-[1px] border-slate-300 p-5"
                  >
                    <div className="flex justify-between">
                      <div className="space-y-[1px]">
                        <h1 className="text-xl">{education_record.school}</h1>
                        <p className="text-md text-slate-600">
                          {education_record.degree} in{" "}
                          {education_record.fieldOfStudy}
                        </p>
                        <p className="text-sm text-slate-500">
                          <span>
                            {Months[education_record.startDate.month].label},{" "}
                            {education_record.startDate.year}
                          </span>
                          <span> - </span>
                          {education_record.endDate.month !== 0 ? (
                            <span>
                              {Months[education_record.endDate.month].label},{" "}
                              {education_record.endDate.year}
                            </span>
                          ) : (
                            <span>Present</span>
                          )}
                        </p>

                        {education_record.grade && (
                          <p className="text-sm text-slate-500">
                            Grade: {education_record.grade}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <UpdateEducation
                          educationalRecordId={education_record.id}
                          educationalRecord={education_record}
                        />
                        <DeleteEducation
                          educationalRecordId={education_record.id}
                          schoolName={education_record.school}
                          degreeName={education_record.degree}
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

export default Educations;
