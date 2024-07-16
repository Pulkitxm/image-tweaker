const listOfFilters = [
  {
    filter: "Basic image manipulation",
    children: [
      {
        property: "rotate",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= 0 && parsedVal <= 360;
        },
        error: "Please enter a number between 0 and 360",
      },
      {
        property: "width",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= 0;
        },
        error: "Please enter a number greater than 0",
      },
      {
        property: "height",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= 0;
        },
        error: "Please enter a number greater than 0",
      },
      {
        property: "crop",
        vals: ["top", "right", "bottom", "left"],
        validate: (val: string) => {
          const parsedVal = val.split(",");
          return parsedVal.length === 4 && parsedVal.some((v) => Number(v));
        },
        error: "Please enter 4 numbers separated by commas",
      },
      {
        property: "flip",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal === 0 || parsedVal === 1;
        },
        error: "Please enter 0 or 1",
      },
      {
        property: "xflip",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal === 0 || parsedVal === 1;
        },
        error: "Please enter 0 or 1",
      },
      {
        property: "yflip",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal === 0 || parsedVal === 1;
        },
        error: "Please enter 0 or 1",
      },
    ],
  },
  {
    filter: "Color Adjustments",
    children: [
      {
        property: "brightness",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= -1 && parsedVal <= 1;
        },
        error: "Please enter a number between -1 and 1",
      },
      {
        property: "contrast",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= -1 && parsedVal <= 1;
        },
        error: "Please enter a number between -1 and 1",
      },
      {
        property: "dither565",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "greyscale",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "invert",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "normalize",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "posterize",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "sepia",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
      {
        property: "fade",
        vals: "single",
        validate: (val: string) => {
          const parsedVal = Number(val);
          return parsedVal >= 0 && parsedVal <= 1;
        },
        error: "Please enter a number between 0 and 1",
      },
    ],
  },
  {
    filter: "Filters and Effects",
    children: [
      {
        property: "blur",
        vals: "single",
        validate: (val: string) => (Number(val) > 0 ? true : false),
        error: "Please enter a number greater than 0",
      },
      {
        property: "gaussian",
        vals: "single",
        validate: (val: string) => (Number(val) > 0 ? true : false),
        error: "Please enter a number greater than 0",
      },
      {
        property: "pixelate",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
    ],
  },
  {
    filter: "Drawing and Text",
    children: [
      {
        property: "circle",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
    ],
  },
  {
    filter: "File Operations",
    children: [
      {
        property: "quality",
        vals: "single",
        validate: (val: string) => (Number(val) ? true : false),
        error: "Please enter any value",
      },
    ],
  },
];
export default listOfFilters;

type val = number | null;
interface filterValType {
  property: string;
  values: {
    [key: string]: val | val[];
  };
}
export function getDefaultValue() {
  const defaultValues: filterValType[] = [];
  listOfFilters.forEach((filter) => {
    const values: {
      [key: string]: val | val[];
    } = {};
    filter.children.forEach((child) => {
      if (Array.isArray(child.vals)) {
        values[child.property] = child.vals.map(() => null);
      } else {
        values[child.property] = null;
      }
    });
    defaultValues.push({
      property: filter.filter,
      values: values,
    });
  });
  return defaultValues;
}
