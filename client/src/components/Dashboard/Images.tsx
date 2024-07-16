import { useEffect } from "react";
import { getAllImages } from "../../lib/image";
import { useRecoilState } from "recoil";
import { imagesState } from "../../state/image";
import Image from "./Image";

export default function Images() {
  const [images, setImages] = useRecoilState(imagesState);
  useEffect(() => {
    getAllImages().then((images) => {
      setImages(images);
    });
  }, [setImages]);
  return (
    <div className="p-10 flex">
      {images.map((image,index) => (
        <Image key={index} image={image} />
      ))}
    </div>
  );
}
