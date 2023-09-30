export const resumeFormData = [
  "Just one form away...",
  "...from lasting resume help.",
  "Lets get started!",
];

export const resumeMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const resumeYears = () => {
  const startYear: number = 1970;
  const endYear: number = new Date().getFullYear();

  const yearsArray: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(year.toString());
  }

  return yearsArray.sort((a, b) => b - a);
};
