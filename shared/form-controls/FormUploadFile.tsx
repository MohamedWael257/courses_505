{
  /* <FormUploadFile 
  label="Upload Document"
  accept=".pdf,.doc,.docx"
  maxSize={20}
  error={formErrors.document}
/> */
}
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineFile } from "react-icons/ai";

type Props = {
  accept?: string;
  label?: string;
  maxSize?: number; // in MB
  required?: boolean;
  error?: string;
};
export default function FormUploadFile({
  accept = "*",
  label,
  maxSize = 10, // default 10MB
  required = false,
  error,
}: Props) {
  const t = useTranslations("LABELS");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFile = (selectedFile: File) => {
    // Check file size
    const fileSize = selectedFile.size / (1024 * 1024); // Convert to MB
    if (fileSize > maxSize) {
      setFileError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type if accept is specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileType = selectedFile.type;
      const fileExtension = `.${selectedFile.name.split(".").pop()}`;

      if (
        !acceptedTypes.some((type) =>
          type.startsWith(".")
            ? fileExtension === type
            : fileType.startsWith(type.replace("/*", ""))
        )
      ) {
        setFileError(`Invalid file type. Accepted: ${accept}`);
        return false;
      }
    }

    setFileError(null);
    return true;
  };

  const handleFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="input-box mb-4 w-full">
      <label className="text-secondary font-medium text-xl   leading-8 inline-block mb-2">
        {label || t("uploadFile")}
        {required && <span className="text-error ml-1">*</span>}
      </label>

      <div
        className={`w-full min-h-[200px] relative border-2 border-dashed rounded-lg p-4
          ${dragActive ? "border-primary bg-primary/5" : "border-gray-300"}
          ${error || fileError ? "border-error" : ""}
          transition-all duration-200`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <AiOutlineFile className="w-12 h-12 text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)}MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setFilePreview(null);
                setFileError(null);
              }}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <IoMdClose className="text-gray-500" size={24} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <FiUploadCloud className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-center mb-2">
              <span className="font-medium">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {accept === "*"
                ? `Any file up to ${maxSize}MB`
                : `Accepted formats: ${accept} (max ${maxSize}MB)`}
            </p>
            <input
              type="file"
              id="fileUpload"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <label
              htmlFor="fileUpload"
              className="bg-primary text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
            >
              {t("uploadFile")}
            </label>
          </div>
        )}
      </div>

      {(error || fileError) && (
        <p className="text-error text-sm mt-2">{error || fileError}</p>
      )}
    </div>
  );
}
