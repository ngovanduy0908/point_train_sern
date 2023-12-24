import dayjs from "dayjs";

export const formatDay = (input) => {
  return dayjs(input).format("DD-MM-YYYY");
};
