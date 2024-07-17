import { IconCloseCircle } from "../../../assets/Close";
import { FiltersType } from "../base";

export default function Width({
  setFilters,
  filters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  filters: FiltersType;
}) {
  return (
    <label className="flex items-center mb-5">
      <p className="capitalize">Width</p>
      <input
        name="width"
        type="number"
        min="0"
        className="mx-3 w-full border-b border-blue-gray-200 bg-transparent pb-0.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        value={filters.width === -1 ? "" : filters.width}
        onChange={(e) => {
          if (!e.target.value) {
            return setFilters((prev) => ({
              ...prev,
              width: -1,
            }));
          }
          setFilters((prev) => ({
            ...prev,
            width: parseInt(e.target.value),
          }));
        }}
      />
      <IconCloseCircle
        onClick={() => {
          setFilters((prev) => ({
            ...prev,
            width: -1,
          }));
        }}
        className={filters.width === -1 ? "opacity-0" : ""}
      />
    </label>
  );
}