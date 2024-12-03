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
import { CertificationSchema } from "@/schema/certification.schema";
import { useAddCertificationRecordMutation } from "@/redux/api/certificationApi";

const AddCertification = () => {
  const [open, setOpen] = React.useState(false);
  const [addCertification, { isLoading: isCreating }] =
    useAddCertificationRecordMutation();

  const onSubmit = async (data: FieldValues) => {
    [data.issueDate, data.expirationDate].map((field) => {
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
      "Please Wait! Try to add new certification.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await addCertification(data).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Certification added successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message || "Failed to add Certification. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to add Certification. Please try again.",
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
        <Plus /> Add Certification
      </Button>
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        title="Add Certification"
        size="70%"
        heightAuto={true}
      >
        <div>
          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(CertificationSchema)}
            defaultValues={{
              name: "",
              issuingOrganization: "",
              issueDate: {
                month: "",
                year: "",
              },
              expirationDate: {
                month: "",
                year: "",
              },
              credentialId: "",
              credentialUrl: "",
              description: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <InputBox
                name="name"
                label="Certification Name"
                placeholder="Enter certification name"
                required={true}
              />
              <InputBox
                name="issuingOrganization"
                label="Issuing Organization Name"
                placeholder="Enter issuing organization name"
                required={true}
              />
              <SelectMonthYear
                name="issueDate"
                label="Issue Date"
                required={true}
              />
              <SelectMonthYear name="expirationDate" label="Expiration Date" />
              <InputBox
                name="credentialId"
                label="Credential Id"
                placeholder="Enter Credential Id"
              />
              <InputBox
                name="credentialUrl"
                label="Credential URL"
                placeholder="Enter Credential URL"
              />
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

export default AddCertification;
