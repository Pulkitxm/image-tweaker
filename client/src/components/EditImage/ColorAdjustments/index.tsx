import Accordion from "../Accordian";
import { FiltersType } from "../base";
import Brightness from "./brightness";
import Contrast from "./contrast";
import Dither565 from "./dither565";
import Fade from "./fase";
import Greyscale from "./greyscale";
import Invert from "./invert";
import Normalize from "./normalize";
import Posterize from "./posterize";
import Sepia from "./sepia";

export default function ColorAdjustments({
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
      <Brightness setFilters={setFilters} filters={filters} />
      <Contrast setFilters={setFilters} filters={filters} />
      <Dither565 setFilters={setFilters} filters={filters} />
      <Greyscale setFilters={setFilters} filters={filters} />
      <Invert setFilters={setFilters} filters={filters} />
      <Normalize setFilters={setFilters} filters={filters} />
      <Posterize setFilters={setFilters} filters={filters} />
      <Sepia setFilters={setFilters} filters={filters} />
      <Fade setFilters={setFilters} filters={filters} />
    </Accordion>
  );
}
