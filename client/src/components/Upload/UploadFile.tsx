import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IconCloseCircle } from "../../assets/Close";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { uploadImage } from "../../lib/image";
import { imagesState } from "../../state/image";

export default function UploadFile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: SetterOrUpdater<boolean>;
}) {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const [file, setfile] = useState<File | null>(null);
  const setImages = useSetRecoilState(imagesState);

  const fileSize = useMemo(() => {
    if (file) {
      const sizeInBytes = file.size;
      const formatFileSize = (size: number) => {
        const units = ["B", "KB", "MB"];
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
          size /= 1024;
          index++;
        }
        return `${size.toFixed(2)} ${units[index]}`;
      };
      return formatFileSize(sizeInBytes);
    }
    return null;
  }, [file]);

  useEffect(() => {
    const dropzone = dropZoneRef.current;
    const input = inputRef.current;
    const preview = previewImgRef.current;
    if (!dropzone || !input || !preview) return;

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("border-indigo-600");
    });

    dropzone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
    });

    function checkFileAndAdd(addfile: File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (addfile && allowedTypes.includes(addfile.type)) {
        if (addfile.size <= 15 * 1024 * 1024) displayPreview(addfile);
        else toast.error("File size is too large");
      } else {
        console.error("Invalid file type");
        toast.error("Invalid file type");
      }
    }

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      const file = e.dataTransfer?.files[0];
      file && checkFileAndAdd(file);
    });

    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      file && checkFileAndAdd(file);
    });

    function displayPreview(file: File) {
      setfile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (preview && typeof reader.result === "string") {
          preview.src = reader.result;
          preview.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);
    }
    const handlePaste = (e: ClipboardEvent) => {
      const clipboardItems = e.clipboardData?.items;
      if (clipboardItems) {
        for (const item of clipboardItems) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            file && checkFileAndAdd(file);
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    });
  }, [open, setOpen]);

  const handleUploadImage = useCallback(async () => {
    if (!file) return toast.error("No file selected");
    toast.promise(uploadImage(file as File), {
      loading: "Uploading image...",
      success: (res) => {
        setImages((prev) => [
          ...prev,
          {
            id: res.data.id,
            isPublic: res.data.isPublic,
            isOwner: true,
          },
        ]);
        setOpen(false);
        return "Image uploaded successfully";
      },
      error: (err) => {
        if (err.response.data.message) return err.response.data.message;
        return "Failed to upload image";
      },
    });
  }, [file, setImages, setOpen]);

  return (
    <div className="bg-white pt-2 rounded-xl flex flex-col w-full md:w-[500px]">
      <div className="flex justify-end mb-10 mr-2">
        <IconCloseCircle
          onClick={() => {
            setOpen(false);
          }}
        />
      </div>
      <div
        className="md:w-a rounded-xl overflow-hidden relative border-2 border-gray-300 m-3 md:m-10 my-0 border-dashed p-3 cursor-pointer"
        ref={dropZoneRef}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
          ref={inputRef}
          title="Select or drag and drop a file"
        />
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />

          <div className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative">
              <span>Drag and drop</span>
              <span className="text-indigo-600"> or browse</span>
              <span>to upload</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>

        <img
          src=""
          className="mt-4 mx-auto max-h-40 hidden"
          ref={previewImgRef}
          title="Preview"
        />
        {/* diplsay image size */}
        {fileSize && (
          <div className="flex items-center justify-center">
            <p className="text-black text-lg">{fileSize}</p>
          </div>
        )}
      </div>
      <div className="mb-5 flex justify-end mx-auto md:mx-10 pt-2">
        <button
          className="text-white hover:text-black bg-green-500 p-3 py-2 rounded-lg"
          onClick={file ? handleUploadImage : () => inputRef.current?.click()}
        >
          {file ? "Upload Image" : "Select Image"}
        </button>
      </div>
    </div>
  );
}
