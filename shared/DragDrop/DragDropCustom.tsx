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
  height: "106px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#EBEBF5",
  borderStyle: "dashed",
  backgroundColor: "#FCFCFD",
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

const DragDropCustom = ({
  setFiles,
  placeholder,
  fileValidate,
  multiple,
  label,
  validateMessage,
}: any) => {
  const t = useTranslations("Index");
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [], "application/pdf": [] },
      multiple: multiple ? true : false,

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
      {label && <p className="text-[#656861] mb-[12px]">{t(label)}</p>}

      <div
        //@ts-ignore
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} />
        <p>
          {placeholder
            ? t(placeholder)
            : t("Drag drop some files here, or click to select files")}{" "}
        </p>
      </div>

      {fileValidate && (
        <p className="text-red-700">
          {validateMessage ? validateMessage : "Error"}
        </p>
      )}
    </div>
  );
};

export default DragDropCustom;
