import { useCallback } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BUCKET_FOLDER_NAME, MAX_UPLOADED_IMAGES } from 'src/entities/auction/constants';
import { getExtension } from 'src/entities/auction/utils/extension';
import { popToast } from 'src/shared/utils/toast';
import { v4 as uuidv4 } from 'uuid';
import type { ImageUploaderProps } from 'src/entities/auction/types';

const ImageUploader = ({ previewImages, setPreviewImages, setImageUrlsToDelete }: ImageUploaderProps) => {
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
          const ext = getExtension(file.name);
          setPreviewImages((prev) => [...prev, { id: uuidv4(), data: reader.result as string, isUrl: false, ext }]);
        };
      });
    },
    [previewImages.length, setPreviewImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', 'gif', '.png', '.webp']
    }
  });

  return (
    <div
      className="flex h-60 w-full justify-center rounded-sm border-2 border-dashed bg-white p-2 align-middle"
      {...getRootProps()}
    >
      {previewImages.length > 0 ? (
        <ul className="grid h-full w-full grid-cols-5 gap-1">
          {previewImages.map((previewImage) => (
            <li className="relative h-full w-full border-2 border-black" key={previewImage.id}>
              <Image
                alt="업로드할 경매 이미지"
                src={previewImage.data}
                className="h-full w-full overflow-hidden object-cover"
                priority
                fill
              />
              <Button
                type="button"
                className="absolute right-1 top-1 h-4 w-4"
                variant="base"
                onClick={(e) => {
                  e.stopPropagation();
                  e.stopPropagation();
                  setPreviewImages((prev) => prev.filter((image) => image.id !== previewImage.id));
                  if (previewImage.isUrl) {
                    setImageUrlsToDelete((prev) => {
                      const imageFullPath: string[] = previewImage.data.split('/');
                      const imagePath = BUCKET_FOLDER_NAME + imageFullPath[imageFullPath.length - 1];
                      console.log('imageDir', imagePath);
                      console.log('imagesToDelete', [...prev, imagePath]);
                      return [...prev, imagePath];
                    });
                  }
                }}
              >
                &times;
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto my-auto flex-col justify-center pb-8 pt-8 align-middle">
          <FaCloudUploadAlt className="text-(--color-accent) mx-auto mb-4 h-14 w-14" />
          <p className="text-md mb-4 text-center">이미지를 끌어다 놓거나</p>
          <p className="bg-(--color-secondary) text-(--color-primary) rounded-sm p-2 text-center text-sm">
            파일 선택하기
          </p>
        </div>
      )}

      <input {...getInputProps()} />
    </div>
  );
};

export default ImageUploader;
