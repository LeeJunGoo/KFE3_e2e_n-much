//NOTE - 업로드할 이미지를 드래그하면 UI에 효과줄 수 있음 (isDragActive)

import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineFileUpload } from 'react-icons/md';

export default function ImageUploader({
  onPreviewImages
}: {
  onPreviewImages: Dispatch<SetStateAction<{ id: string; data: string }[]>>;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      onPreviewImages([]);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          onPreviewImages((prev) => [...prev, { id: uuidv4(), data: reader.result as string }]);
        };
      });
    },
    [onPreviewImages]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  return (
    <div
      className="w-full h-2xl border-dotted border-2 rounded-sm flex justify-center align-middle"
      {...getRootProps()}
    >
      <div className="flex-col justify-center align-middle mx-auto my-auto pt-8 pb-8">
        <MdOutlineFileUpload className="w-14 h-14 mx-auto mb-4" />
        <p className="text-xl mb-4 text-center">이미지를 드래그하거나 클릭하여 업로드</p>
        <p className="text-sm text-gray-500 text-center">PNG, JPG, GIF 파일을 지원합니다.</p>
      </div>
      <input {...getInputProps()} />
      {/* {isDragActive ? (
        <p className="">Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </div>
  );
}
