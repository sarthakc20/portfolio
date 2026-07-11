const MONTH_MAP = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseExperienceDate = (dateStr) => {
  const [monthStr, yearStr] = dateStr.trim().split(" ");
  const month = MONTH_MAP[monthStr];
  const year = parseInt(yearStr, 10);

  if (month === undefined || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, month, 1);
};

const formatDuration = (totalMonths) => {
  const months = Math.max(totalMonths, 1);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${months} mo${months !== 1 ? "s" : ""}`;
  }

  if (remainingMonths === 0) {
    return `${years} yr${years !== 1 ? "s" : ""}`;
  }

  return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo${
    remainingMonths !== 1 ? "s" : ""
  }`;
};

export const calculateDuration = (durationStr) => {
  if (!durationStr || !durationStr.includes(" - ")) {
    return "";
  }

  const [startStr, endStr] = durationStr.split(" - ").map((part) => part.trim());
  const startDate = parseExperienceDate(startStr);

  if (!startDate) {
    return "";
  }

  const endDate =
    endStr.toLowerCase() === "present"
      ? new Date()
      : parseExperienceDate(endStr);

  if (!endDate) {
    return "";
  }

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  return formatDuration(totalMonths);
};
