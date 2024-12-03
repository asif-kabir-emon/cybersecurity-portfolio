import InputBox from "@/components/Form/InputBox";
import Form from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SelectMonthYear from "@/components/Form/SelectMonthYear";
import { ResponsiveDrawer } from "@/components/Shared/Drawer/ResponsiveDrawer";
import { CertificationSchema } from "@/schema/certification.schema";
import TextAreaBox from "@/components/Form/TextAreaBox";
import { useUpdateCertificationRecordMutation } from "@/redux/api/certificationApi";

const UpdateCertification = ({
  certificationId,
  certificationData,
}: {
  certificationId: string;
  certificationData: {
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
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateCertification, { isLoading: isUpdating }] =
    useUpdateCertificationRecordMutation();

  const onSubmit = async (data: FieldValues) => {
    [data.issueDate, data.expirationDate].map((field) => {
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
      "Please Wait! Try to update certification data.",
      {
        position: "top-center",
      },
    );
    try {
      const response = await updateCertification({
        id: certificationId,
        body: data,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Certification updated successfully.",
          {
            id: toastId,
          },
        );
        setOpen(false);
      } else {
        throw new Error(
          response?.message ||
            "Failed to updated certification. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update certification. Please try again.",
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
            resolver={zodResolver(CertificationSchema)}
            defaultValues={{
              name: certificationData.name,
              issuingOrganization: certificationData.issuingOrganization,
              issueDate: {
                month: certificationData.issueDate.month.toString(),
                year: certificationData.issueDate.year.toString(),
              },
              expirationDate: {
                month: certificationData.expirationDate.month
                  ? certificationData.expirationDate.month.toString()
                  : "Null",
                year: certificationData.expirationDate.year
                  ? certificationData.expirationDate.year.toString()
                  : "Null",
              },
              credentialId: certificationData.credentialId || "",
              credentialUrl: certificationData.credentialUrl || "",
              description: certificationData.description || "",
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
            <Button type="submit" className="mt-5 w-full" disabled={isUpdating}>
              Save
            </Button>
          </Form>
        </div>
      </ResponsiveDrawer>
    </div>
  );
};

export default UpdateCertification;
