export const generatePagesToDisplay = (
  currentPage: number,
  totalPages: number
) => {
  const maxPagesToShow = 5;
  let pagesToDisplay: (number | string)[] = [currentPage];

  if (totalPages <= maxPagesToShow) {
    pagesToDisplay = [...Array(totalPages).keys()].map((page) => page + 1);
  } else if (currentPage <= 3) {
    pagesToDisplay = [1, 2, 3, 4, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pagesToDisplay = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pagesToDisplay = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pagesToDisplay;
};

export const checkProperty = (property: any) => {
  if (property instanceof File) {
    if (property.size !== 0) return true;
  }

  if (typeof property === "string") {
    if (property !== "") return true;
  }

  if (typeof property === "boolean") {
    return true;
  }

  if (typeof property === "number") {
    return true;
  }

  return false;
};

export const valueFormatData = (value: any) => {
  if (value instanceof File) {
    return value as Blob;
  }

  return String(value);
};
