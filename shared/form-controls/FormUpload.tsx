// import React, { useEffect, useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import { Image, Spin, Upload } from 'antd';
// import type { FormInstance, UploadFile, UploadProps } from 'antd';
// import { useTranslations } from 'next-intl';
// import "@/styles/app-uploader.scss";
// import axiosInstanceGeneralClient from '@/utils/axiosClientGeneral';
// import { EditIcon } from 'lucide-react';
// import AppModal from '../CustomModal/AppModal';
// type FileType = File;
// interface ImageWallProps {
//   initialFileList?: any;
//   onChange?: (fileList: UploadFile[]) => void;
//   onRemove?: (fileList: UploadFile[]) => void;
//   maxCount?: number;
//   disabled?: boolean;
//   hideTitle?: boolean;
//   singleFile?: boolean;
//   uploadText?: string;
//   form: FormInstance;
//   shapeType?: any;
//   type_file?: 'image' | 'document' | 'media';
//   name: string;
//   model: string;
// }
// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
//   const FormUpload: React.FC<ImageWallProps> = ({
//     onChange,
//     maxCount = 1,
//     disabled,
//     uploadText,
//     form,
//     shapeType = "picture-card",
//     type_file = 'image',
//     singleFile,
//     name = "image",
//     model,
//     initialFileList = [],
//     onRemove
//   }) => {
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewContent, setPreviewContent] = useState<string>('');
//     const [previewType, setPreviewType] = useState<'image' | 'video' | 'document' | ''>('');
//     const [fileList, setFileList] = useState<any>([]);
//     const [deleteLoading, setDeleteLoading] = useState(false);
//     const t = useTranslations();
//     useEffect(() => {
//       if (JSON.stringify(initialFileList) !== JSON.stringify(fileList)) {
//         setFileList(initialFileList);
//       }
//     }, [initialFileList]);
//     const handlePreview = async (file: UploadFile) => {
//       if (type_file === 'document') {
//         setPreviewType('document');
//         setPreviewContent(file.url || (file.preview as string));
//       } else if (type_file === 'media') {
//         const isVideo = file.type?.startsWith('video');
//         setPreviewType(isVideo ? 'video' : 'image');
//         if (!file.url && !file.preview) {
//           file.preview = await getBase64(file.originFileObj as FileType);
//         }
//         setPreviewContent(file.url || (file.preview as string));
//       } else {
//         setPreviewType('image');
//         if (!file.url && !file.preview) {
//           file.preview = await getBase64(file.originFileObj as FileType);
//         }
//         setPreviewContent(file.url || (file.preview as string));
//       }
//       setPreviewOpen(true);
//     };
//     const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
//       for (let file of newFileList as any) {
//         if (fileList.some((f: any) => f.name === file.name)) {
//           continue;
//         }
//         let attachmentType = '';
//         if (file.type.startsWith('image/')) {
//           attachmentType = 'image';
//         } else if (file.type.startsWith('video/')) {
//           attachmentType = 'video';
//         } else {
//           attachmentType = 'file';
//         }
//         const formData = new FormData();
//         formData.append("file", file.originFileObj);
//         formData.append("attachment_type", attachmentType);
//         formData.append("model", model);
//         try {
//           const { data } = await axiosInstanceGeneralClient.post('/attachments', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//           if (data) {
//             file.status = "done";
//             setFileList((prevList: any) => [...prevList, file]);
//             if (onChange) {
//               onChange(data?.data);
//             } else {
//               form.setFieldValue(name, data?.data);
//             }
//           }
//         } catch (error) {
//           console.error("Error uploading file:", error);
//         }
//       }
//     };
//     const handleRemove = async (file: UploadFile) => {
//       if (file?.uid) {
//         setDeleteLoading(true);
//         try {
//           const {data} = await axiosInstanceGeneralClient.delete(`/attachments/${file.uid}`)
//           if(data){
//             const updatedFiles = fileList.filter((item: any) => item.uid !== file.uid)
//             setFileList(updatedFiles);
//             form.setFieldValue(name, updatedFiles);
//             if (onRemove) {
//               onRemove(updatedFiles);
//             }
//           }
//           setDeleteLoading(false);
//         } catch (error) {
//           console.error("Error deleting file:", error);
//           setDeleteLoading(false);
//         }
//       }
//     };
//     const uploadButton = (
//       <button
//         className='bg-transparent border-none flex flex-col items-center justify-center'
//         type="button"
//       >
//         {fileList.length !== 0 && singleFile ? (
//           <div className='absolute bottom-0 start-0'>
//             <EditIcon />
//           </div>
//         ) : (
//           <div className='flex-col justify-center items-center gap-2.5 inline-flex'>
//             <span className='size-6 rounded-full border border-[#ABABAB]'>
//               <PlusOutlined />
//             </span>
//             {uploadText}
//           </div>
//         )}
//       </button>
//     );
//     return (
//       <>
//         <Spin spinning={deleteLoading}>
//           <Upload
//             customRequest={() => ""}
//             listType={shapeType}
//             fileList={fileList}
//             onPreview={handlePreview}
//             onChange={handleChange}
//             onRemove={handleRemove}
//             accept={type_file === 'media' ? 'image/*,video/*' : type_file === 'image' ? 'image/*' : '.pdf,.doc,.docx'}
//             className={`${type_file === 'image' ? 'image-uploader' : type_file === "media" ? fileList.length < 1 ? "file-uploader" : "image-uploader" : 'file-uploader'}`}
//             disabled={disabled}
//             maxCount={maxCount}
//           >
//             {fileList.length >= maxCount ? null : uploadButton}
//           </Upload>
//         </Spin>
//         {/* Preview Modal */}
//         {previewOpen && (
//           <AppModal
//             isModalVisible={previewOpen}
//             width={previewType === 'document' ? '80%' : 'fit-content'}
//             getContainer={"html"}
//             onCancel={()=>setPreviewOpen(false)}
//             centered
//             key={`app-Preview-modal`}
//           >
//             {previewType === 'video' ? (
//               <video controls style={{ width: '100%' }}>
//                 <source src={previewContent} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             ) : previewType === 'document' ? (
//               <iframe
//                 src={previewContent || ''}
//                 style={{ width: '100%', height: '500px', border: 'none' }}
//               />
//             ) : (
//               <Image
//                 wrapperStyle={{ display: 'none' }}
//                 preview={{
//                   visible: previewOpen,
//                   onVisibleChange: (visible) => setPreviewOpen(visible),
//                   afterOpenChange: (visible) => !visible && setPreviewContent(''),
//                 }}
//                 src={previewContent}
//               />
//             )}
//           </AppModal>
//         )}
//       </>
//     );
//   };
//   export default FormUpload;
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { Upload, Spin, Image, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { EditIcon } from "lucide-react";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import AppModal from "../CustomModal/AppModal";
import { UploadIcon } from "../Icons";

type FileType = File;

interface FormUploadProps {
  name: string;
  label?: string;
  uploadText?: string;
  model: string;
  maxCount?: number;
  disabled?: boolean;
  shapeType?: "picture-card" | "text";
  type_file?: "image" | "document" | "media";
  singleFile?: boolean;
  showRequired?: boolean;
  initialFileList?: any;
  onChange?: (fileList: any[]) => void;
  onRemove?: (fileList: any[]) => void;
  className?: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FormUpload: React.FC<FormUploadProps> = ({
  name,
  label,
  model,
  uploadText,
  maxCount = 1,
  disabled,
  shapeType = "picture-card",
  type_file = "image",
  singleFile,
  showRequired = false,
  initialFileList = [],
  onChange,
  onRemove,
  className,
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>("");
  const [previewType, setPreviewType] = useState<
    "image" | "video" | "document" | ""
  >("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const t = useTranslations("LABELS");
  const form = useFormContext();

  useEffect(() => {
    if (JSON.stringify(initialFileList) !== JSON.stringify(fileList)) {
      setFileList(initialFileList);
    }
  }, [initialFileList]);
  const handlePreview = async (file: UploadFile) => {
    if (type_file === "document") {
      setPreviewType("document");
      setPreviewContent(file.url || (file.preview as string));
    } else if (type_file === "media") {
      const isVideo = file.type?.startsWith("video");
      setPreviewType(isVideo ? "video" : "image");
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewContent(file.url || (file.preview as string));
    } else {
      setPreviewType("image");
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewContent(file.url || (file.preview as string));
    }
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    for (let file of newFileList as any) {
      if (fileList.some((f: any) => f.name === file.name)) {
        continue;
      }
      let attachmentType = "";
      if (file.type.startsWith("image/")) {
        attachmentType = "image";
      } else if (file.type.startsWith("video/")) {
        attachmentType = "video";
      } else {
        attachmentType = "file";
      }

      const formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("attachment_type", attachmentType);
      formData.append("model", model);

      try {
        const { data } = await axiosInstanceGeneralClient.post(
          "attachments",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data) {
          file.status = "done";
          setFileList((prevList: any) => [...prevList, file]);
          if (onChange) {
            onChange(data?.data);
          } else {
            form.setValue(name, data?.data);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file?.uid) {
      setDeleteLoading(true);
      try {
        const { data } = await axiosInstanceGeneralClient.delete(
          `attachments/${file.uid}`
        );
        if (data) {
          const updatedFiles = fileList.filter(
            (item: any) => item.uid !== file.uid
          );
          setFileList(updatedFiles);
          form.setValue(name, updatedFiles);

          if (onRemove) {
            onRemove(updatedFiles);
          }
        }
        setDeleteLoading(false);
      } catch (error) {
        console.error("Error deleting file:", error);
        setDeleteLoading(false);
      }
    }
  };

  const uploadButton = (
    <button
      type="button"
      className="bg-transparent border-none flex flex-col items-center justify-center"
    >
      {fileList.length !== 0 && singleFile ? (
        <div className="absolute bottom-0 start-0">
          <EditIcon />
        </div>
      ) : (
        <div className="flex-col justify-center items-center text-[#818C92] gap-2.5 inline-flex">
          <UploadIcon />
          {uploadText}
        </div>
      )}
    </button>
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel className=" text-secondary font-medium text-lg   leading-6 my-2  px-2">
              {showRequired && <span className="text-error">*</span>}
              {t(label)}
            </FormLabel>
          )}
          <FormControl>
            <Spin spinning={deleteLoading}>
              <Upload
                customRequest={() => ""}
                listType={shapeType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                accept={
                  type_file === "media"
                    ? "image/*,video/*"
                    : type_file === "image"
                    ? "image/*"
                    : ".pdf,.doc,.docx"
                }
                className={`${
                  type_file === "image"
                    ? "image-uploader"
                    : type_file === "media"
                    ? fileList.length < 1
                      ? "file-uploader"
                      : "image-uploader"
                    : "file-uploader"
                } ${className ? className : ""} `}
                disabled={disabled}
                maxCount={maxCount}
              >
                {fileList.length >= maxCount ? null : uploadButton}
              </Upload>
            </Spin>
          </FormControl>
          <FormMessage />
          {previewOpen && (
            <AppModal
              isModalVisible={previewOpen}
              width={previewType === "document" ? "80%" : "fit-content"}
              getContainer={"html"}
              onCancel={() => setPreviewOpen(false)}
              centered
              key="app-Preview-modal"
            >
              {previewType === "video" ? (
                <video controls style={{ width: "100%" }}>
                  <source src={previewContent} type="video/mp4" />
                </video>
              ) : previewType === "document" ? (
                <iframe
                  src={previewContent}
                  style={{ width: "100%", height: "500px", border: "none" }}
                />
              ) : (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (v) => setPreviewOpen(v),
                    afterOpenChange: (v) => !v && setPreviewContent(""),
                  }}
                  src={previewContent}
                />
              )}
            </AppModal>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormUpload;
