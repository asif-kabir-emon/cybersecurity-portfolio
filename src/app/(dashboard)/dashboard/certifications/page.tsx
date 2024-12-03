"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddCertification from "./AddCertification";
import { useGetCertificationRecordsQuery } from "@/redux/api/certificationApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";
import { Months } from "@/constants";
import UpdateCertification from "./UpdateCertification";
import DeleteCertification from "./DeleteCertification";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

const Certifications = () => {
  const { data: certifications, isLoading: isFetchingData } =
    useGetCertificationRecordsQuery({});

  return (
    <div>
      <AppHeader pageName="Certifications" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Certifications</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddCertification />
          </div>
        </div>

        <div>
          {isFetchingData && (
            <div>
              <LoadingTableData />
            </div>
          )}

          {!isFetchingData && certifications?.data?.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Certification Available</span>
            </div>
          )}

          {!isFetchingData && certifications?.data?.length > 0 && (
            <div className="mt-5 space-y-3">
              {certifications?.data?.map(
                (certification: {
                  id: string;
                  name: string;
                  issuingOrganization: string;
                  credentialId: string;
                  credentialUrl: string;
                  issueDate: {
                    month: number;
                    year: number;
                  };
                  expirationDate: {
                    month: number;
                    year: number;
                  };
                  description: string;
                }) => (
                  <div
                    key={certification.id}
                    className="rounded-[10px] border-[1px] border-slate-300 p-5"
                  >
                    <div className="flex justify-between">
                      <div className="space-y-[1px]">
                        <h1 className="text-lg">{certification.name}</h1>
                        <p className="text-md text-slate-600">
                          {certification.issuingOrganization}
                        </p>
                        <p className="text-sm text-slate-500">
                          <div>
                            Issued at:{" "}
                            {Months[certification.issueDate.month].label},{" "}
                            {certification.issueDate.year}
                          </div>
                          {certification.expirationDate.month !== 0 && (
                            <div>
                              Expired on:{" "}
                              {Months[certification.expirationDate.month].label}
                              , {certification.expirationDate.year}
                            </div>
                          )}
                        </p>

                        {certification.credentialId && (
                          <p className="text-sm text-slate-500">
                            Credential Id: {certification.credentialId}
                          </p>
                        )}

                        {certification.credentialUrl && (
                          <div className="pt-2">
                            <Button
                              onClick={() =>
                                window.open(certification.credentialUrl)
                              }
                              variant={"outline"}
                              className="button-outline px-5 py-1 rounded-full margin-2"
                            >
                              Show Credential <MoveUpRight />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <UpdateCertification
                          certificationId={certification.id}
                          certificationData={certification}
                        />
                        <DeleteCertification
                          certificationId={certification.id}
                          certificationName={certification.name}
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

export default Certifications;
