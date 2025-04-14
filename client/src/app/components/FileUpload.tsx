// /components/FileUpload.tsx
"use client";
import React, { useState } from "react";
import { FileUpload } from "@/app/components/ui/file-upload";

interface FileUploadDemoProps {
  onChange: (file: File) => void;
  resetKey: number;
  existingImageUrl?: string | null;
}

export function FileUploadDemo({
  onChange,
  resetKey,
  existingImageUrl,
}: FileUploadDemoProps) {
  const [, setFile] = useState<File | null>(null);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white/80 dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col items-center">
      <FileUpload
        key={resetKey}
        onChange={handleFileUpload}
        existingImageUrl={existingImageUrl ?? undefined}
      />
    </div>
  );
}
