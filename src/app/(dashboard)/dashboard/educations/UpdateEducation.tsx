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

const UpdateEducation = ({
  educationalRecordId,
  educationalRecord,
}: {
  educationalRecordId: string;
  educationalRecord: {
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
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateEducationalRecord, { isLoading: isUpdating }] =
    useUpdateEducationRecordMutation();

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
      "Please Wait! Try to update educational record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await updateEducationalRecord({
        id: educationalRecordId,
        body: data,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Educational record updated successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to updated educational record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to update educational record. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <button
        aria-label="Update Skill"
        className="hover:bg-slate-200 p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="w-5 h-5" />
      </button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Update Skill"
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(EducationSchema)}
            defaultValues={{
              school: educationalRecord.school,
              degree: educationalRecord.degree,
              fieldOfStudy: educationalRecord.fieldOfStudy,
              startDate: {
                month: educationalRecord.startDate.month.toString(),
                year: educationalRecord.startDate.year.toString(),
              },
              endDate: {
                month: educationalRecord.endDate.month
                  ? educationalRecord.endDate.month.toString()
                  : "Null",
                year: educationalRecord.endDate.year
                  ? educationalRecord.endDate.year.toString()
                  : "Null",
              },
              grade: educationalRecord.grade,
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="school"
                label="School Name"
                placeholder="Enter school name"
                required={true}
              />
              <InputBox
                name="degree"
                label="Degree Name"
                placeholder="Enter degree name"
                required={true}
              />
              <InputBox
                name="fieldOfStudy"
                label="Field of Study"
                placeholder="Enter field of study"
                required={true}
              />
              <SelectMonthYear
                name="startDate"
                label="Start Date"
                required={true}
              />
              <SelectMonthYear name="endDate" label="End Date" />
              <InputBox name="grade" label="Grade" placeholder="Enter grade" />
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

export default UpdateEducation;
