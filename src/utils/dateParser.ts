export const parseFixTime = (value: string) => {
  const [datePart, timePart, modifier] = value.split(" ");

  const [month, day, year] = datePart.split("/").map(Number);
  // eslint-disable-next-line prefer-const
  let [hours, minutes, seconds] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
};
