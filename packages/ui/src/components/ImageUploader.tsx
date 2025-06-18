import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploader({ onPreviewImages }: { onPreviewImages: Dispatch<SetStateAction<string[]>> }) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      onPreviewImages([]);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          onPreviewImages((prev) => [...prev, reader.result as string]);
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
    <div className="w-full h-2xs bg-amber-500" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
}
