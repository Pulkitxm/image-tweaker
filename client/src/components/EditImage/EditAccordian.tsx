import axios from "axios";
import { BACKEND_API_BASE_URL } from "../../config";
import Accordion from "./Accordian";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import listOfFilters, { getDefaultValue } from "./base";

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
  const [currTitle, setCurrTitle] = useState("");
  const [allFilters, setAllFilters] = useState(getDefaultValue());

  const changeAccordionState = (title: string) => {
    setCurrTitle((prevTitle) => (prevTitle === title ? "" : title));
  };

  const handleApplyFilters = useCallback(async () => {
    if (!url) {
      return toast.error(
        "Please wait for the image to load before applying filters"
      );
    }
    setLoading(true);
    try {
      const respImage = await axios.get(
        `${BACKEND_API_BASE_URL}/api/image/${imageId}`,
        {
          params: {
            width: 1000,
            height: 1000,
          },
          withCredentials: true,
          responseType: "blob",
        }
      );
      const newUrl = URL.createObjectURL(respImage.data);
      setUrl(newUrl);
    } catch (error) {
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  }, [url, imageId, setLoading, setUrl]);

  const handleInputChange = useCallback(
    (
      filterIndex: number,
      property: string,
      value: number | null,
      arrayIndex?: number
    ) => {
      const validator = listOfFilters[filterIndex].children.find(
        (child) => child.property === property
      )?.validate;
      const errorMsg = listOfFilters[filterIndex].children.find(
        (child) => child.property === property
      )?.error;
      const res = validator ? validator(value?.toString() ?? "") : true;
      if (!res) return errorMsg && toast.error(errorMsg);
      setAllFilters((prevFilters) => {
        const newFilters = [...prevFilters];
        if (
          arrayIndex !== undefined &&
          Array.isArray(newFilters[filterIndex].values[property])
        ) {
          (newFilters[filterIndex].values[property] as number[])[arrayIndex] =
            value ?? 0;
        } else {
          newFilters[filterIndex].values[property] = value ?? 0;
        }
        return newFilters;
      });
    },
    []
  );

  const renderFilterInputs = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (filterIndex: number, child: any, filter: string) => {
      if (Array.isArray(child.vals)) {
        // eslint-disable-next-line
        return (
          <div className="my-1">
            <h1>{child.property}</h1>
            {child.vals.map((_, arrayIndex: number) => (
              <div key={arrayIndex}>
                <label htmlFor={`${filter}${child.property}${arrayIndex}`}>
                  {
                    listOfFilters[filterIndex].children.find(
                      (item) => item.property === child.property
                    )?.vals[arrayIndex]
                  }
                </label>
                <input
                  type="number"
                  id={`${filter}${child.property}${arrayIndex}`}
                  value={
                    (
                      allFilters[filterIndex].values[child.property] as number[]
                    )[arrayIndex] ?? ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      filterIndex,
                      child.property,
                      Number(e.target.value),
                      arrayIndex
                    )
                  }
                />
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div
            key={child.property}
            className="flex items-center justify-center space-x-3"
          >
            <label htmlFor={`${filter}${child.property}`} className="w-24">
              {child.property}
            </label>
            <input
              type="number"
              className="w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              id={`${filter}${child.property}`}
              value={
                (allFilters[filterIndex].values[child.property] as number) ?? ""
              }
              onChange={(e) =>
                handleInputChange(
                  filterIndex,
                  child.property,
                  Number(e.target.value)
                )
              }
            />
          </div>
        );
      }
    },
    [allFilters, handleInputChange]
  );

  return (
    <div className="w-[50%] h-full border-l-2 p-10 z-10 bg-white overflow-y-scroll">
      <button onClick={handleApplyFilters}>Apply filters</button>
      <br />
      {listOfFilters.map((item, filterIndex) => (
        <Accordion
          title={item.filter}
          changeAccordionState={changeAccordionState}
          currTitle={currTitle}
          key={filterIndex}
        >
          {item.children.map((child) =>
            renderFilterInputs(filterIndex, child, item.filter)
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default EditAccordion;
