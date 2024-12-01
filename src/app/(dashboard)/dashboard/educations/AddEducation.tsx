import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { modifyPayload } from "@/utils/modifyPayload";
import { useAddEducationRecordMutation } from "@/redux/api/educationApi";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import { EducationSchema } from "@/schema/education.schema";

const AddEducation = () => {
  const [open, setOpen] = React.useState(false);
  const [addEducationalRecord, { isLoading: isCreating }] =
    useAddEducationRecordMutation();

  const onSubmit = async (data: FieldValues) => {
    [data.startDate, data.endDate].map((field) => {
      if (
        field.month === "" ||
        field.month === null ||
        field.month === undefined ||
        field.year === "" ||
        field.year === null ||
        field.year === undefined
      ) {
        field.month = 0;
        field.year = 0;
      } else {
        field.month = Number(field.month);
        field.year = Number(field.year);
      }
    });

    const toastId = toast.loading(
      "Please Wait! Try to add new educational record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await addEducationalRecord(data).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Educational record added successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to add educational record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to add educational record. Please try again.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <div>
      <Button
        className="rounded-2xl text-sm py-0"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Education
      </Button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Add Education"
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(EducationSchema)}
            defaultValues={{
              school: "",
              degree: "",
              fieldOfStudy: "",
              startDate: {
                month: "",
                year: "",
              },
              endDate: {
                month: "",
                year: "",
              },
              grade: "",
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
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default AddEducation;
