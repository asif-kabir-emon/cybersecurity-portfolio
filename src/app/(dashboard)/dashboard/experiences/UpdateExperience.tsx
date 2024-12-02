import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateEducationRecordMutation } from "@/redux/api/educationApi";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { EducationSchema } from "@/schema/education.schema";
import { ExperienceSchema } from "@/schema/experience.schema";
import TextAreaBox from "@/components/Form/TextAreaBox";
import { useUpdateExperienceMutation } from "@/redux/api/experienceApi";

const UpdateExperience = ({
  experienceId,
  experience,
}: {
  experienceId: string;
  experience: {
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
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateExperience, { isLoading: isUpdating }] =
    useUpdateExperienceMutation();

  const onSubmit = async (data: FieldValues) => {
    [data.startDate, data.endDate].map((field) => {
      if (
        field.month === "" ||
        field.month === null ||
        field.month === undefined ||
        field.month === "Null" ||
        field.year === "" ||
        field.year === null ||
        field.year === undefined ||
        field.year === "Null"
      ) {
        field.month = 0;
        field.year = 0;
      } else {
        field.month = Number(field.month);
        field.year = Number(field.year);
      }
    });

    const toastId = toast.loading(
      "Please Wait! Try to update experience record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await updateExperience({
        id: experienceId,
        body: data,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Experience record updated successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to updated experience record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to update experience record. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <button
        aria-label="Update Experience"
        className="hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Experience"
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ExperienceSchema)}
            defaultValues={{
              companyName: experience.companyName,
              role: experience.role,
              startDate: {
                month: experience.startDate.month.toString(),
                year: experience.startDate.year.toString(),
              },
              endDate: {
                month:
                  experience.endDate.month === 0
                    ? "Null"
                    : experience.endDate.month.toString(),
                year:
                  experience.endDate.year === 0
                    ? "Null"
                    : experience.endDate.year.toString(),
              },
              description: experience.description || "",
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="companyName"
                label="Company Name"
                placeholder="Enter company name"
                required={true}
              />
              <InputBox
                name="role"
                label="Role"
                placeholder="Enter role"
                required={true}
              />
              <SelectMonthYear
                name="startDate"
                label="Start Date"
                required={true}
              />
              <SelectMonthYear name="endDate" label="End Date" />
              <TextAreaBox name="description" label="Description" />
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

export default UpdateExperience;
