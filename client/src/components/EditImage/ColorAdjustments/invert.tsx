import { IconCloseCircle } from "../../../assets/Close";
import { FiltersType } from "../base";

export default function Invert({
  setFilters,
  filters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  filters: FiltersType;
}) {
  return (
    <label className="flex items-center mb-5">
      <p className="capitalize">Invert</p>
      <input
        name="invert"
        type="number"
        className="mx-3 w-full border-b border-blue-gray-200 bg-transparent pb-0.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        value={filters.invert === -1 ? "" : filters.invert}
        onChange={(e) => {
          if (!e.target.value) {
            return setFilters((prev) => ({
              ...prev,
              invert: -1,
            }));
          }
          if (
            parseInt(e.target.value) === 0 ||
            parseInt(e.target.value) === 1
          ) {
            return setFilters((prev) => ({
              ...prev,
              invert: Number(e.target.value),
            }));
          }
        }}
      />
      <IconCloseCircle
        onClick={() => {
          setFilters((prev) => ({
            ...prev,
            invert: -1,
          }));
        }}
        className={filters.invert === -1 ? "opacity-0" : ""}
      />
    </label>
  );
}
