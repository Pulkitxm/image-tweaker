import { useEffect, useState } from "react";
import { getAllImages } from "../../lib/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imagesState, openUploadDialogState } from "../../state/image";
import Image from "./Image";

import { Gallery } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function Images() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useRecoilState(imagesState);
  const setOpenUploadDialogState = useSetRecoilState(openUploadDialogState);
  useEffect(() => {
    getAllImages()
      .then((images) => {
        setImages(images);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setImages]);
  return (
    <div
      className={`flex flex-wrap ${
        loading || images.length === 0
          ? "flex-col justify-center items-center h-full w-full"
          : "m-5 justify-center items-center"
      }`}
    >
      {loading ? (
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          className="w-16 h-16 md:w-20 md:h-20 animate-spin text-primary"
        >
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
        </svg>
      ) : (
        <Gallery>
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
        </Gallery>
      )}
    </div>
  );
}
