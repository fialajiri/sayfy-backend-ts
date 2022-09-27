const normalizeStringToUrl = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
};

const normalizeStringToUrlWithDate = (str: string, isoDate: string) => {
  return `${normalizeStringToUrl(str)}_${isoToDateString(isoDate)}`;
};

const isoToDateString = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();
};
