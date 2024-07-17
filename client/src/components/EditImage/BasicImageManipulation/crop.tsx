import { IconCloseCircle } from "../../../assets/Close";
import { baseFilters, FiltersType } from "../base";

export default function Crop({
  setFilters,
  filters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  filters: FiltersType;
}) {
  return (
    <div>
      <h1 className="underline mb-2">Crop</h1>
      <div className="pl-5">
        {[
          Object.keys(baseFilters.crop).map((key, index) => (
            <label className="flex items-center mb-5" key={index}>
              <p className="capitalize"> {key}</p>
              <input
                name="height"
                type="number"
                min="0"
                className="mx-3 w-full border-b border-blue-gray-200 bg-transparent pb-0.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={
                  filters.crop[key as keyof typeof filters.crop] === -1
                    ? ""
                    : filters.crop[key as keyof typeof filters.crop]
                }
                onChange={(e) => {
                  if (!e.target.value) {
                    return setFilters((prev) => ({
                      ...prev,
                      height: -1,
                    }));
                  }
                  setFilters((prev) => ({
                    ...prev,
                    crop: {
                      ...prev.crop,
                      [key]: Number(e.target.value),
                    },
                  }));
                }}
              />
              <IconCloseCircle
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    height: -1,
                  }));
                }}
                className={filters.height === -1 ? "opacity-0" : ""}
              />
            </label>
          )),
        ]}
      </div>
    </div>
  );
}
