import { useEffect, useState } from "react";
import DraggableImage from "./DraggableImage";
import { useParams } from "react-router-dom";
import EditAccordian from "./EditAccordian";
import GridBg from "../../assets/grid.png";
import { getImage } from "../../lib/image";

export default function EditImage() {
  const { imageId } = useParams();
  const [url, setUrl] = useState("");
  const [navHeight, setNavHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNavHeight(document.getElementsByTagName("nav")[0].clientHeight);
  }, []);
  useEffect(() => {
    if (!imageId) return;
    getImage(imageId).then((url) => setUrl(url));
  }, [imageId]);
  if (imageId)
    return (
      <div
        className="w-screen h-screen flex overflow-hidden"
        style={{
          paddingTop: navHeight,
        }}
      >
        <DraggableImage
          className="w-[50%] h-full overflow-hidden flex justify-center items-center"
          src={url}
          loading={loading}
        />
        <div className="absolute w-[50%] h-full overflow-hidden bg-gray-100 flex justify-center items-center -z-[1]">
          <img
            src={GridBg}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <EditAccordian
          setLoading={setLoading}
          loading={loading}
          setUrl={setUrl}
          imageId={imageId}
          url={url}
        />
      </div>
    );
}
