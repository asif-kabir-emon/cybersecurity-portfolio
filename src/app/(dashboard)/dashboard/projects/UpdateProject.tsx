import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CheckBox from "@/components/Form/CheckBox";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import TextEditor from "@/components/Form/TextEditor";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { useUpdateProjectMutation } from "@/redux/api/projectApi";
import { ProjectSchema } from "@/schema/project.schema";

const UpdateProject = ({
  projectId,
  projectTitle,
  projectData,
}: {
  projectId: string;
  projectTitle: string;
  projectData: {
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
  };
}) => {
  const [open, setOpen] = React.useState(false);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const onSubmit = async (data: FieldValues) => {
    ["startDate", "endDate"].forEach((field) => {
      if (data[field]?.month === "Null" || data[field]?.year === "Null") {
        data[field].month = null;
        data[field].year = null;
      } else {
        data[field].month = parseInt(data[field].month);
        data[field].year = parseInt(data[field].year);
      }
    });

    if (data.isCurrentlyWorking) {
      data["endDate"].month = null;
      data["endDate"].year = null;
    }

    const toastId = toast.loading("Please Wait! Try to update project.", {
      position: "top-center",
    });

    try {
      const response = await updateProject({
        id: projectId,
        body: data,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Project updated successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to updated project. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update project. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <button
        aria-label="Update Project"
        className="hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Project"
        size="90%"
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ProjectSchema)}
            defaultValues={{
              title: projectData.title,
              description: projectData.description,
              startDate: {
                month:
                  projectData.startDate.month === 0
                    ? "Null"
                    : projectData.startDate.month.toString(),
                year:
                  projectData.startDate.year === 0
                    ? "Null"
                    : projectData.startDate.year.toString(),
              },
              endDate: {
                month:
                  projectData.endDate.month === 0
                    ? "Null"
                    : projectData.endDate.month.toString(),
                year:
                  projectData.endDate.year === 0
                    ? "Null"
                    : projectData.endDate.year.toString(),
              },
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="title"
                label="Project Title"
                placeholder="Enter project title"
                required={true}
              />
              <TextEditor
                name="description"
                label="Description"
                placeholder="Enter project description"
                required={true}
              />

              <SelectMonthYear name="startDate" label="Start Date" />
              <SelectMonthYear
                name="endDate"
                label="End Date"
                watchFields={["isCurrentlyWorking"]}
              />

              <CheckBox
                name="isCurrentlyWorking"
                label="I am currently working on this project"
              />

              <InputBox
                name="github_link"
                type="text"
                label="Github URL"
                placeholder="Enter Github URL"
              />
              <InputBox
                name="live_demo"
                type="text"
                label="Live URL"
                placeholder="Enter Live URL"
              />
              <InputBox
                name="video_demo"
                type="text"
                label="Video URL"
                placeholder="Enter Video URL"
              />
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isUpdating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default UpdateProject;
