"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";
import AddProject from "./AddProject";
import { useGetProjectsQuery } from "@/redux/api/projectApi";
import LoadingTableData from "@/components/Shared/Skeleton/LoadingTableData";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Months } from "@/constants";
import DeleteProject from "./DeleteProject";
import { ImageIcon } from "lucide-react";
import UpdateProject from "./UpdateProject";
import ManageProjectImage from "./ManageProjectImage";
import ReorderProjectImage from "./ReorderProjectImage";

const Projects = () => {
  const { data: projects, isLoading: isFetchingData } = useGetProjectsQuery({});

  return (
    <div>
      <AppHeader pageName="Projects" />
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl">Projects</h1>
          <div className="mt-5 md:mt-0 flex gap-3 items-center">
            <AddProject />
          </div>
        </div>

        <div>
          {isFetchingData && (
            <div>
              <LoadingTableData />
            </div>
          )}

          {!isFetchingData && projects?.data?.length === 0 && (
            <div className="mb-5">
              <span className="text-slate-400">No Project Available</span>
            </div>
          )}

          {!isFetchingData && projects?.data?.length > 0 && (
            <div className="mt-5">
              <Table className="border-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="md:w-36">Project</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects?.data?.map(
                    (project: {
                      id: string;
                      images: string[];
                      title: string;
                      description: string;
                      startDate: {
                        month: number;
                        year: number;
                      };
                      endDate: {
                        month: number;
                        year: number;
                      };
                      github_link: string;
                      live_demo: string;
                      video_demo: string;
                    }) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          {project.images[0] ? (
                            <Image
                              src={project?.images[0]}
                              width={150}
                              height={85}
                              alt={project.title}
                              className="rounded-[5px] w-[150px] h-[85px]"
                            />
                          ) : (
                            <div className="w-[150px] h-[85px] rounded-[5px] bg-slate-200 text-white flex justify-center items-center">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {project.title}
                        </TableCell>
                        <TableCell>
                          {project.startDate.month === 0
                            ? "Not mentioned"
                            : `${Months[project.startDate.month].label}, 
                            ${project.startDate.year} - ${
                                project.endDate.month === 0 &&
                                project.endDate.year === 0
                                  ? "Present"
                                  : `${Months[project.endDate.month].label}, 
                            ${project.endDate.year}`
                              }`}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ReorderProjectImage
                              projectId={project.id}
                              projectImages={project.images}
                              projectTitle={project.title}
                            />
                            <ManageProjectImage
                              projectId={project.id}
                              projectImages={project.images}
                            />
                            <UpdateProject
                              projectId={project.id}
                              projectTitle={project.title}
                              projectData={project}
                            />
                            <DeleteProject
                              projectId={project.id}
                              projectTitle={project.title}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
