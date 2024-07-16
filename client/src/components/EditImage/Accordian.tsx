const Accordion = ({
  title,
  children,
  changeAccordionState,
  currTitle,
}: {
  title: string;
  changeAccordionState: (title: string) => void;
  children: React.ReactNode;
  currTitle: string;
}) => {
  const isOpen = currTitle === title;
  return (
    <div className="w-full mx-auto my-2 bg-white rounded-lg shadow-md">
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => changeAccordionState(title)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
