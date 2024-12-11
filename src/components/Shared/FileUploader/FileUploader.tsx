import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { DrawerDialog } from "../Drawer/DialogDrawer";
import { Check, Upload } from "lucide-react";

type FileUploaderProps = {
  onSubmit: (file: File) => void;
  buttonText?: string;
  fileType?: string;
};

const FileUploader = ({
  onSubmit,
  buttonText = "Upload",
  fileType = "image/*",
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    if (file && onSubmit) {
      onSubmit(file);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-black text-white rounded-[5px] text-md"
      >
        {buttonText}
      </Button>

      <DrawerDialog
        open={isOpen}
        setOpen={() => {
          setFile(null);
          setPreview(null);
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col items-center gap-4 p-2">
          <div
            className="w-full min-h-64 border-dashed border-2 border-gray-300 rounded-md flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto object-cover aspect-square mx-auto rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={32} className="text-gray-400" />
                <p className="text-gray-400 mt-2">Drag and Drop file here</p>
                <p className="text-gray-400">Or</p>
                <label
                  htmlFor="file-upload"
                  className="mt-2 px-4 py-2 bg-black text-white rounded-[5px] cursor-pointer"
                >
                  Browse
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept={fileType}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {file && (
            <div className="flex w-full justify-end gap-4">
              <Button
                onClick={handleSubmit}
                className="px-6 py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-[5px]"
              >
                <Check /> OK
              </Button>
            </div>
          )}
        </div>
      </DrawerDialog>
    </div>
  );
};

export default FileUploader;
