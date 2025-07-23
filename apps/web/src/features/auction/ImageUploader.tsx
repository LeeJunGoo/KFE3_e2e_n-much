//TODO - 업로드할 이미지 확장자 의논하기 (KMH)

import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MAX_UPLOADED_IMAGES } from 'src/entities/auction/constants';
import { popToast } from 'src/shared/utils/toast';
import { v4 as uuidv4 } from 'uuid';
import type { PreviewImage } from 'src/entities/auction/types';

//TODO - 파일로 분리하기 (KMH)
interface ImageUploaderProps {
  previewImages: PreviewImage[];
  setPreviewImages: Dispatch<SetStateAction<PreviewImage[]>>;
}

const ImageUploader = ({ previewImages, setPreviewImages }: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (previewImages.length + acceptedFiles.length > MAX_UPLOADED_IMAGES) {
        popToast('error', '이미지 업로드 에러', '업로드 가능한 이미지 갯수를 초과했습니다. (최대 5개)', 'medium');
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewImages((prev) => [...prev, { id: uuidv4(), data: reader.result as string, isUrl: false }]);
        };
      });
    },
    [previewImages.length, setPreviewImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    }
  });

  return (
    <div
      className="h-2xl flex w-full justify-center rounded-sm border-2 border-dashed bg-white align-middle"
      {...getRootProps()}
    >
      <div className="mx-auto my-auto flex-col justify-center pb-8 pt-8 align-middle">
        <FaCloudUploadAlt className="text-(--color-accent) mx-auto mb-4 h-14 w-14" />
        <p className="text-md mb-4 text-center">이미지를 끌어다 놓거나</p>
        <p className="bg-(--color-secondary) text-(--color-primary) rounded-sm p-2 text-center text-sm">
          파일 선택하기
        </p>
      </div>
      <input {...getInputProps()} />
    </div>
  );
};

export default ImageUploader;
