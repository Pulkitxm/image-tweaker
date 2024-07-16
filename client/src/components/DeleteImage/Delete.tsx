import { useEffect } from "react";
import toast from "react-hot-toast";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { deleteImage } from "../../lib/image";
import { imagesState } from "../../state/image";

interface DeleteConfig {
  open: boolean;
  imageId: string;
  imageUrl: string;
}

export default function Delete({
  deleteImageConfig,
  setDeleteImageConfig,
}: {
  deleteImageConfig: DeleteConfig;
  setDeleteImageConfig: SetterOrUpdater<DeleteConfig>;
}) {
  const setImages = useSetRecoilState(imagesState);
  useEffect(() => {
    function handleCloseWithEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDeleteImageConfig({ open: false, imageId: "", imageUrl: "" });
      }
    }
    window.addEventListener("keydown", handleCloseWithEsc);
    return () => window.removeEventListener("keydown", handleCloseWithEsc);
  }, [setDeleteImageConfig]);
  function closeModal() {
    setDeleteImageConfig({ open: false, imageId: "", imageUrl: "" });
  }
  function handleDleteImage() {
    toast.promise(deleteImage(deleteImageConfig.imageId), {
      loading: "Deleting image...",
      success: () => {
        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== deleteImageConfig.imageId)
        );
        closeModal();
        return "Image deleted successfully";
      },
      error: (err) => {
        if (err.response.data.message) return err.response.data.message;
        return "Failed to delete image";
      },
    });
  }

  return (
    <div className="w-full md:w-[600px] p-5 bg-white rounded-xl">
      <h1 className="text-xl font-semibold mb-4 flex text-red-600">
        <svg
          className="text-gray-400 dark:text-gray-500 w-7 h-7"
          aria-hidden="true"
          fill="red"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>{" "}
        Are you sure you want to delete this image?
      </h1>
      <img
        src={deleteImageConfig.imageUrl}
        alt="delete"
        className="w-full h-full md:w-[300px] md:h-[300px] aspect-square object-cover mx-auto shadow-custom2 rounded-xl"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="mt-5 flex justify-end space-x-2">
        <button
          data-modal-toggle="deleteModal"
          type="button"
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={closeModal}
        >
          No, cancel
        </button>
        <button
          type="submit"
          className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={handleDleteImage}
        >
          Yes, I'm sure
        </button>
      </div>
    </div>
  );
}
