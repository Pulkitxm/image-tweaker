import Accordion from "../Accordian";
import { FiltersType } from "../base";
import Quality from "./quality";

export default function FileOperations({
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
      <Quality filters={filters} setFilters={setFilters} />
    </Accordion>
  );
}
