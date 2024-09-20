import axios from "axios";
import { useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import BasicImageManipulation from "./BasicImageManipulation";
import { baseFilters, FiltersType } from "./base";
import ColorAdjustments from "./ColorAdjustments";
import FiltersEffects from "./FiltersEffect";
import FileOperations from "./FileOperations";
import DrawingText from "./DrawingText";
import Copy, { IconOpenInNew } from "../../assets/Copy";
import { BACKEND_URL } from "../../lib/constants";
import PublicToggle from "./PublicToggle";
import { useRecoilValue } from "recoil";
import { imagesState } from "../../state/image";

const EditAccordion = ({
  loading,
  setLoading,
  setUrl,
  imageId,
  url,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  imageId: string;
  url: string;
}) => {
  const images = useRecoilValue(imagesState);
  const image = useMemo(() => {
    return images.find((image) => image.id == imageId);
  }, [images, imageId]);
  const listOfFilters = [
    {
      title: "Basic Image Manipulation",
      component: BasicImageManipulation,
    },
    {
      title: "Colour Adjustments",
      component: ColorAdjustments,
    },
    {
      title: "Filters & Effects",
      component: FiltersEffects,
    },
    {
      title: "Drawing and Text",
      component: DrawingText,
    },
    {
      title: "File Operations",
      component: FileOperations,
    },
  ];
  const [loadingFInalEdit, setLoadingFInalEdit] = useState(false);
  const [filters, setFilters] = useState<FiltersType>(baseFilters);
  const finalUrl = useMemo(() => {
    let newFinalUrl = "";

    Object.entries(filters).forEach(([key, value]) => {
      if (
        key == "crop" &&
        typeof value != "number" &&
        Object.values(value).every((val) => val != -1)
      ) {
        const crop = value;
        newFinalUrl += `&crop=${crop.top},${crop.right},${crop.bottom},${crop.left}`;
      } else if (typeof value == "number" && value != -1) {
        newFinalUrl += `&${key}=${value}`;
      }
    });
    return (
      BACKEND_URL +
      "/api/image/" +
      imageId +
      (newFinalUrl ? "?" + newFinalUrl : "")
    );
  }, [filters, imageId]);
  const [currTitle, setCurrTitle] = useState("");
  const changeAccordionState = (title: string) => {
    setCurrTitle((prevTitle) => (prevTitle === title ? "" : title));
  };
  const handleApplyFilters = useCallback(
    async (reset = false) => {
      if (!url) {
        return toast.error(
          "Please wait for the image to load before applying filters"
        );
      }
      if (loading || loadingFInalEdit)
        return toast.error(
          "Please wait for the previous operation to complete"
        );
      if (!reset && !finalUrl) return toast.error("No filters selected");
      setLoading(true);
      try {
        setLoadingFInalEdit(true);
        const respImage = await axios.get(
          reset
            ? `${BACKEND_URL}/api/image/${imageId}`
            : `${BACKEND_URL}/api/image/${imageId}?${finalUrl}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: "blob",
          }
        );
        const newUrl = URL.createObjectURL(respImage.data);
        setUrl(newUrl);
        reset && setFilters(baseFilters);
      } catch (error) {
        toast.error("Failed to apply filters");
      } finally {
        setLoading(false);
        setLoadingFInalEdit(false);
      }
    },
    [url, loading, loadingFInalEdit, finalUrl, setLoading, imageId, setUrl]
  );

  return (
    <div className="w-[50%] max-w-[50%] h-full border-l-2 p-10 z-10 bg-white overflow-y-scroll">
      <h1 className="text-2xl font-bold">Edit Image</h1>
      <br />
      <div className="w-full border-2 border-black bg-white px-3 py-1 text-base font-semibold text-black min-h-10 mb-4 break-all">
        <p>{finalUrl}</p>
        <hr className="bg-black h-1 my-3" />
        <div className="flex justify-end space-x-2">
          <Copy
            onCopy={() => {
              navigator.clipboard.writeText(finalUrl);
              toast.success("Copied to clipboard");
            }}
          />
          <IconOpenInNew
            className="h-6 w-6 cursor-pointer"
            onClick={() => window.open(finalUrl, "_blank")}
          />
        </div>
      </div>
      <div className="flex space-x-5">
        <button onClick={() => handleApplyFilters()} className="relative">
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-primary hover:text-gray-900">
            Apply Filters
          </span>
        </button>
        <button onClick={() => handleApplyFilters(true)} className="relative">
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-primary hover:text-gray-900">
            Reset Filters
          </span>
        </button>
        {image && image.isOwner && (
          <label className="inline-flex items-center cursor-pointer">
            <span className="text-sm font-medium text-gray-900 mr-2">
              Public Image
            </span>
            <PublicToggle imageId={imageId} />
          </label>
        )}
      </div>
      <br />
      {listOfFilters.map((item, filterIndex) => {
        const Component = item.component;
        return (
          <Component
            key={filterIndex}
            title={item.title}
            changeAccordionState={changeAccordionState}
            currTitle={currTitle}
            filterIndex={filterIndex}
            filters={filters}
            setFilters={setFilters}
          />
        );
      })}
    </div>
  );
};

export default EditAccordion;
