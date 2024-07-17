import Accordion from "../Accordian";
import { FiltersType } from "../base";
import Crop from "./crop";
import Flip from "./flip";
import Height from "./height";
import Rotate from "./rotate";
import Width from "./width";
import Xflip from "./xflip";
import Yflip from "./yflip";

export default function BasicImageManipulation({
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
      <Rotate setFilters={setFilters} filters={filters} />
      <Width setFilters={setFilters} filters={filters} />
      <Height setFilters={setFilters} filters={filters} />
      <Crop setFilters={setFilters} filters={filters} />
      <Flip setFilters={setFilters} filters={filters} />
      <Xflip setFilters={setFilters} filters={filters} />
      <Yflip setFilters={setFilters} filters={filters} />
    </Accordion>
  );
}
