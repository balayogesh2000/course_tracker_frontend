export const differenceBetweenDates = (dateA, dateB) => {
  const date1 = new Date(dateA);
  const date2 = new Date(dateB);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
