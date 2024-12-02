import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import TextAreaBox from "@/components/Form/TextAreaBox";
import { ExperienceSchema } from "@/schema/experience.schema";
import { useAddExperienceMutation } from "@/redux/api/experienceApi";

const AddExperience = () => {
  const [open, setOpen] = React.useState(false);
  const [addExperienceRecord, { isLoading: isCreating }] =
    useAddExperienceMutation();

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
      "Please Wait! Try to add new experience record.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await addExperienceRecord(data).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Experience record added successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to add experience record. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to add experience record. Please try again.",
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
        <Plus /> Add Experience
      </Button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Add Experience"
        description="Experience is the knowledge or mastery of an event or subject gained through involvement in or exposure to it."
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(ExperienceSchema)}
            defaultValues={{
              companyName: "",
              role: "",
              startDate: {
                month: "",
                year: "",
              },
              endDate: {
                month: "",
                year: "",
              },
              description: "",
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
            <Button type="submit" className="mt-5 w-full" disabled={isCreating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default AddExperience;
