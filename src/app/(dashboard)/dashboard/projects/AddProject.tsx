import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import TextEditor from "@/components/Form/TextEditor";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import CheckBox from "@/components/Form/CheckBox";
import InputImages from "@/components/Form/InputImages";
import { ProjectSchema } from "@/schema/project.schema";
import { useAddProjectMutation } from "@/redux/api/projectApi";
import { modifyPayload } from "@/utils/modifyPayload";

const AddProject = () => {
  const [open, setOpen] = React.useState(false);
  const [addProject, { isLoading: isCreating }] = useAddProjectMutation();

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

    const uploadedImages = data.images;
    delete data.images;

    const payload = {
      ...data,
      files: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading("Please Wait! Try to add new Project.", {
      position: "top-center",
    });
    try {
      const response = await addProject(modifiedData).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success(response?.message || "Project added successfully.", {
          id: toastId,
        });
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to add project. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to add project. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Project
      </Button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Add Project"
        description="Portfolio projects are the projects that you have worked on. You can add your projects here."
        size="90%"
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ProjectSchema)}
            defaultValues={{
              title: "",
              description: "",
              images: [],
              startDate: {
                month: "Null",
                year: "Null",
              },
              endDate: {
                month: "Null",
                year: "Null",
              },
              isCurrentlyWorking: false,
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

              <InputImages name="images" label="Project Images" />

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
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default AddProject;
