import { useEffect } from "react";
import { getAllImages } from "../../lib/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imagesState, openUploadDialogState } from "../../state/image";
import Image from "./Image";

export default function Images() {
  const [images, setImages] = useRecoilState(imagesState);
  const setOpenUploadDialogState = useSetRecoilState(openUploadDialogState);
  useEffect(() => {
    getAllImages().then((images) => {
      setImages(images);
    });
  }, [setImages]);
  return (
    <div
      className={`p-10 flex flex-wrap ${
        images.length === 0 ? "flex-col justify-center items-center h-full" : ""
      }`}
    >
      {images.length ? (
        images.map((image, index) => <Image key={index} image={image} />)
      ) : (
        <>
          <h1 className="text-2xl text-center">No images found</h1>
          <button
            onClick={() => {
              setOpenUploadDialogState(true);
            }}
            className="relative"
          >
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-primary hover:text-gray-900">
              Upload Image
            </span>
          </button>
        </>
      )}
    </div>
  );
}
