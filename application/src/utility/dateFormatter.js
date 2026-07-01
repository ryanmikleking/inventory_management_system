export const dateFormatter = (date) => {
  const rawDate = new Date(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(rawDate);
};
