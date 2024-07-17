import Accordion from "../Accordian";
import { FiltersType } from "../base";
import Blur from "./blur";
import Gaussian from "./gaussian";
import Pixelate from "./pixelate";

export default function FiltersEffects({
  title,
  changeAccordionState,
  currTitle,
  filterIndex,
  filters,
  setFilters,
}: {
  title: string;
  changeAccordionState: (title: string) => void;
  currTitle: string;
  filterIndex: number;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}) {
  return (
    <Accordion
      title={title}
      changeAccordionState={changeAccordionState}
      currTitle={currTitle}
      key={filterIndex}
    >
      <Blur filters={filters} setFilters={setFilters} />
      <Gaussian filters={filters} setFilters={setFilters} />
      <Pixelate filters={filters} setFilters={setFilters} />
    </Accordion>
  );
}
