import { cn } from "@/app/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { FileRejection, useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({
  onChange,
  existingImageUrl,
}: {
  onChange?: (files: File[]) => void;
  existingImageUrl?: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingFileName = existingImageUrl
    ? decodeURIComponent(existingImageUrl.split("/").pop() ?? "")
    : null;

  const [remoteFileInfo, setRemoteFileInfo] = useState<{
    size?: number;
    type?: string;
    lastModified?: string;
  } | null>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const selectedFile = newFiles[0];
      setFile(selectedFile);
      if (onChange) {
        onChange([selectedFile]);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    fileInputRef.current?.click();
  };

  const handleDropRejected = (error: FileRejection[]) => {
    console.error("File rejected:", error);
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: handleDropRejected,
  });

  useEffect(() => {
    const fetchRemoteFileInfo = async () => {
      if (!existingImageUrl) return;

      try {
        const response = await fetch(existingImageUrl, {
          method: "HEAD",
        });

        const size = response.headers.get("content-length");
        const type = response.headers.get("content-type");
        const lastModified = response.headers.get("last-modified");

        setRemoteFileInfo({
          size: size ? Number(size) : undefined,
          type: type ?? undefined,
          lastModified: lastModified ?? undefined,
        });
      } catch (error) {
        console.error("Failed to fetch image metadata:", error);
      }
    };

    fetchRemoteFileInfo();
  }, [existingImageUrl]);

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base text-center">
            Upload Image (jpeg, png, and avif)
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2 text-center">
            Drag or drop your image here or click to upload
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file || existingImageUrl ? (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                  "shadow-sm"
                )}
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                    {file?.name ?? existingFileName}
                  </motion.p>
                  {!file && remoteFileInfo?.size && (
                    <motion.p className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                      {(remoteFileInfo.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  )}
                </div>

                <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 gap-4 justify-between text-neutral-600 dark:text-neutral-400">
                  {(file?.type || remoteFileInfo?.type) && (
                    <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                      {file?.type ?? remoteFileInfo?.type}
                    </motion.p>
                  )}
                  {(file?.lastModified || remoteFileInfo?.lastModified) && (
                    <motion.p className="text-nowrap text-xs">
                      modified{" "}
                      {file?.lastModified
                        ? new Date(file.lastModified).toLocaleDateString()
                        : remoteFileInfo?.lastModified
                        ? new Date(
                            remoteFileInfo.lastModified
                          ).toLocaleDateString()
                        : "N/A"}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32  w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!file && !existingImageUrl && (
              <motion.div
                variants={secondaryVariant}
                className="absolute border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) => (
        <React.Fragment key={row}>
          {Array.from({ length: columns }).map((_, col) => {
            const index = row * columns + col;
            return (
              <div
                key={`${col}-${row}`}
                className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-neutral-950"
                    : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
