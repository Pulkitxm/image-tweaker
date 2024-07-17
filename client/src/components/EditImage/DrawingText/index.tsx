import Accordion from "../Accordian";
import { FiltersType } from "../base";
import Circle from "./circle";

export default function DrawingText({
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
      <Circle filters={filters} setFilters={setFilters} />
    </Accordion>
  );
}
