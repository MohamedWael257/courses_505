/* eslint-disable react/no-unescaped-entities */
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  height: "80px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#F4F4F3",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DragDrop = ({
  setFiles,
  placeholder,
  fileValidate,
  errormessage,
}: any) => {
  const t = useTranslations("validations");

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [], "application/pdf": [] },
      multiple: false,

      onDrop: (newFiles) => {
        setFiles(newFiles);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,

      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div className="container">
      <div
        //@ts-ignore
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} />
        <p>
          {placeholder
            ? t(placeholder)
            : "Drag drop some files here, or click to select files"}{" "}
        </p>
      </div>

      {fileValidate && (
        <p className="text-red-700">
          {errormessage ? t(errormessage) : "Error"}
        </p>
      )}
    </div>
  );
};

export default DragDrop;
