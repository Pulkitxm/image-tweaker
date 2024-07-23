import { useEffect, useState } from "react";
import DraggableImage from "./DraggableImage";
import { Link, useParams } from "react-router-dom";
import EditAccordian from "./EditAccordian";
import GridBg from "../../assets/grid.png";
import { getImage } from "../../lib/image";
import { useCookies } from "react-cookie";

export default function EditImage() {
  const { imageId } = useParams();
  const [url, setUrl] = useState("");
  const [navHeight, setNavHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [{ token }] = useCookies(["token"]);
  useEffect(() => {
    setNavHeight(document.getElementsByTagName("nav")[0].clientHeight);
  }, []);
  useEffect(() => {
    if (!imageId || !token) return;
    getImage(imageId).then((url) => setUrl(url));
  }, [imageId, token]);
  if (imageId)
    return token ? (
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
    ) : (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex space-x-4 mt-4">
            <Link to={"/login"}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
}
