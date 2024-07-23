import { useEffect, useState } from "react";
import { getImagePrivacy, updateImagePrivacy } from "../../lib/image";
import Loader from "../../assets/Loader";

export default function PublicToggle({ imageId }: { imageId: string }) {
  const [isPublic, setIsPublic] = useState<null | boolean>(null);
  useEffect(() => {
    getImagePrivacy(imageId).then(setIsPublic);
  }, [imageId]);

  if (isPublic === null) {
    return <Loader />;
  }

  async function handleChangeImagePublic(isPublic: boolean) {
    setIsPublic(null);
    updateImagePrivacy(imageId, isPublic)
      .then(() => {
        setIsPublic(isPublic);
      })
      .catch(() => {
        setIsPublic(false);
      });
  }

  return (
    <>
      <input
        type="checkbox"
        checked={isPublic}
        className="sr-only peer"
        onChange={async (e) => {
          handleChangeImagePublic(e.target.checked);
        }}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
    </>
  );
}
